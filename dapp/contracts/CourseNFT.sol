// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CourseNFT is ERC721URIStorage, Ownable {
    // Use a simple uint256 counter instead of the deprecated Counters library
    uint256 private _nextTokenId;
    
    // Maps courseId to whether it's a valid course
    mapping(uint256 => bool) public validCourses;
    
    // Maps user address to array of their certificate IDs
    mapping(address => uint256[]) public userCertificates;
    
    // Maps tokenId to certificate data
    mapping(uint256 => Certificate) public certificates;
    
    struct Certificate {
        uint256 courseId;
        string courseTitle;
        string level;
        uint256 completionDate;
        bool isMinted;
    }
    
    // Events
    event CertificateIssued(address indexed student, uint256 indexed courseId, uint256 certificateId);
    event CertificateMinted(address indexed student, uint256 indexed certificateId);
    
    constructor() ERC721("DevLearn Certificate", "DLC") Ownable(msg.sender) {
        _nextTokenId = 0;
    }
    
    // Admin function to add valid courses
    function addCourse(uint256 courseId) external onlyOwner {
        validCourses[courseId] = true;
    }
    
    // Admin function to remove courses
    function removeCourse(uint256 courseId) external onlyOwner {
        validCourses[courseId] = false;
    }
    
    // Issue a certificate (only callable by the contract owner/platform)
    function issueCertificate(
        address student, 
        uint256 courseId, 
        string memory courseTitle,
        string memory level,
        string memory metadataURI
    ) external onlyOwner returns (uint256) {
        require(validCourses[courseId], "Course does not exist");
        
        uint256 newCertificateId = _nextTokenId;
        _nextTokenId++;
        
        certificates[newCertificateId] = Certificate({
            courseId: courseId,
            courseTitle: courseTitle,
            level: level,
            completionDate: block.timestamp,
            isMinted: false
        });
        
        userCertificates[student].push(newCertificateId);
        
        // Store off-chain metadata URI (doesn't mint the NFT yet)
        _setTokenURI(newCertificateId, metadataURI);
        
        emit CertificateIssued(student, courseId, newCertificateId);
        
        return newCertificateId;
    }
    
    // User can mint their certificate as NFT
    function mintCertificate(uint256 certificateId) external {
        bool isUsersCertificate = false;
        
        // Check if the certificate belongs to the user
        uint256[] memory userCerts = userCertificates[msg.sender];
        for (uint i = 0; i < userCerts.length; i++) {
            if (userCerts[i] == certificateId) {
                isUsersCertificate = true;
                break;
            }
        }
        
        require(isUsersCertificate, "Not your certificate");
        require(!certificates[certificateId].isMinted, "Certificate already minted");
        
        // Mint the NFT to the user
        _safeMint(msg.sender, certificateId);
        
        // Mark as minted
        certificates[certificateId].isMinted = true;
        
        emit CertificateMinted(msg.sender, certificateId);
    }
    
    // Get all certificates for a user
    function getUserCertificates(address user) external view returns (uint256[] memory) {
        return userCertificates[user];
    }
    
    // Get certificate details
    function getCertificateDetails(uint256 certificateId) external view returns (Certificate memory) {
        return certificates[certificateId];
    }
    
    // Check if a certificate is minted
    function isCertificateMinted(uint256 certificateId) external view returns (bool) {
        return certificates[certificateId].isMinted;
    }
}