import { expect } from "chai";
import { ethers } from "hardhat";
import { CourseNFT } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("CourseNFT", function () {
  let courseNFT: CourseNFT;
  let owner: SignerWithAddress;
  let student1: SignerWithAddress;
  let student2: SignerWithAddress;
  let courseId = 1;
  let metadataURI = "ipfs://QmExample";

  beforeEach(async function() {
    // Get signers
    [owner, student1, student2] = await ethers.getSigners();
    
    // Deploy CourseNFT contract
    const CourseNFTFactory = await ethers.getContractFactory("CourseNFT");
    courseNFT = await CourseNFTFactory.deploy();
    await courseNFT.waitForDeployment();

    // Add a course
    await courseNFT.addCourse(courseId);
  });

  describe("Course Management", function() {
    it("Should add a course correctly", async function() {
      expect(await courseNFT.validCourses(courseId)).to.equal(true);
    });
    
    it("Should remove a course correctly", async function() {
      await courseNFT.removeCourse(courseId);
      expect(await courseNFT.validCourses(courseId)).to.equal(false);
    });
    
    it("Should revert when non-owner tries to add a course", async function() {
      await expect(
        courseNFT.connect(student1).addCourse(2)
      ).to.be.reverted;
    });
  });
  
  describe("Certificate Management", function() {
    it("Should issue a certificate correctly", async function() {
      const tx = await courseNFT.issueCertificate(
        student1.address,
        courseId,
        "Blockchain Basics",
        "Beginner",
        metadataURI
      );
      
      // Get certificate ID from event
      const receipt = await tx.wait();
      const event = receipt?.logs.find(log => 
        log.eventName === "CertificateIssued"
      );
      
      expect(event).to.exist;
      if (event) {
        const certificateId = event.args[2];
        
        // Check certificate details
        const cert = await courseNFT.getCertificateDetails(certificateId);
        expect(cert.courseTitle).to.equal("Blockchain Basics");
        expect(cert.level).to.equal("Beginner");
        expect(cert.isMinted).to.equal(false);
        
        // Check user's certificates
        const userCerts = await courseNFT.getUserCertificates(student1.address);
        expect(userCerts.length).to.equal(1);
        expect(userCerts[0]).to.equal(certificateId);
      }
    });
    
    it("Should revert when issuing certificate for non-existent course", async function() {
      await expect(
        courseNFT.issueCertificate(
          student1.address,
          999, // Non-existent course ID
          "Invalid Course",
          "Advanced",
          metadataURI
        )
      ).to.be.revertedWith("Course does not exist");
    });
    
    it("Should mint a certificate correctly", async function() {
      // First issue a certificate
      const tx = await courseNFT.issueCertificate(
        student1.address,
        courseId,
        "Smart Contract Development",
        "Intermediate",
        metadataURI
      );
      
      const receipt = await tx.wait();
      const event = receipt?.logs.find(log => 
        log.eventName === "CertificateIssued"
      );
      
      if (event) {
        const certificateId = event.args[2];
        
        // Student mints the certificate
        await courseNFT.connect(student1).mintCertificate(certificateId);
        
        // Check if minted
        expect(await courseNFT.isCertificateMinted(certificateId)).to.equal(true);
        
        // Check NFT ownership
        expect(await courseNFT.ownerOf(certificateId)).to.equal(student1.address);
      }
    });
    
    it("Should revert when someone else tries to mint another's certificate", async function() {
      // First issue a certificate to student1
      const tx = await courseNFT.issueCertificate(
        student1.address,
        courseId,
        "DApp Development",
        "Advanced",
        metadataURI
      );
      
      const receipt = await tx.wait();
      const event = receipt?.logs.find(log => 
        log.eventName === "CertificateIssued"
      );
      
      if (event) {
        const certificateId = event.args[2];
        
        // Student2 tries to mint student1's certificate
        await expect(
          courseNFT.connect(student2).mintCertificate(certificateId)
        ).to.be.revertedWith("Not your certificate");
      }
    });
    
    it("Should revert when trying to mint an already minted certificate", async function() {
      // First issue a certificate
      const tx = await courseNFT.issueCertificate(
        student1.address,
        courseId,
        "Blockchain Security",
        "Expert",
        metadataURI
      );
      
      const receipt = await tx.wait();
      const event = receipt?.logs.find(log => 
        log.eventName === "CertificateIssued"
      );
      
      if (event) {
        const certificateId = event.args[2];
        
        // Mint it once
        await courseNFT.connect(student1).mintCertificate(certificateId);
        
        // Try to mint it again
        await expect(
          courseNFT.connect(student1).mintCertificate(certificateId)
        ).to.be.revertedWith("Certificate already minted");
      }
    });
  });

  describe("Certificate Retrieval", function() {
    it("Should correctly retrieve all certificates for a user", async function() {
      // Issue multiple certificates to a student
      await courseNFT.issueCertificate(
        student1.address,
        courseId,
        "Course 1",
        "Beginner",
        metadataURI
      );
      
      await courseNFT.issueCertificate(
        student1.address,
        courseId,
        "Course 2",
        "Intermediate",
        metadataURI
      );
      
      // Check user has both certificates
      const userCerts = await courseNFT.getUserCertificates(student1.address);
      expect(userCerts.length).to.equal(2);
    });
  });
});