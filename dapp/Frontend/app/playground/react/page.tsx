'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Style/playground.module.css';
import dynamic from 'next/dynamic';

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

// Component for the problem statement display
const ProblemStatement = ({ problem }) => {
  return (
    <div className={styles.problemPanel}>
      <h2>Problem Statement</h2>
      <div className={styles.problemContent}>
        <h3>{problem.title}</h3>
        <p>{problem.description}</p>
        {problem.examples && (
          <div className={styles.examples}>
            <h4>Examples:</h4>
            {problem.examples.map((example, idx) => (
              <div key={idx} className={styles.example}>
                <strong>Input:</strong> <code>{example.input}</code><br />
                <strong>Output:</strong> <code>{example.output}</code>
                {example.explanation && (
                  <><br /><strong>Explanation:</strong> {example.explanation}</>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Component for the file explorer
const FileExplorer = ({ files, activeFile, onFileSelect }) => {
  return (
    <div className={styles.fileExplorer}>
      <h3>Files</h3>
      <ul>
        {files.map((file) => (
          <li 
            key={file.name}
            className={file.name === activeFile ? styles.active : ''}
            onClick={() => onFileSelect(file.name)}
          >
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component for the code editor
const CodeEditor = ({ code, onChange, language }) => {
  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line' as 'line',
    automaticLayout: true,
  };

  return (
    <div className={styles.editorContainer}>
      <MonacoEditor
        width="100%"
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        options={options}
        onChange={onChange}
      />
    </div>
  );
};

// Component for the terminal
const Terminal = ({ output }) => {
  const terminalRef = useRef(null);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className={styles.terminal} ref={terminalRef}>
      <div className={styles.terminalHeader}>
        <span>Terminal</span>
      </div>
      <div className={styles.terminalContent}>
        {output.map((line, idx) => (
          <div key={idx} className={`${styles.terminalLine} ${styles[line.type]}`}>
            {line.content}
          </div>
        ))}
      </div>
    </div>
  );
};

// Component for the preview
const Preview = ({ html }) => {
  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewHeader}>
        <span>Preview</span>
      </div>
      <iframe
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
        className={styles.previewFrame}
      />
    </div>
  );
};

// Main playground component
const PlaygroundPage = () => {
  // Sample problem
  const problem = {
    title: "Create a Counter Component",
    description: "Build a React counter component that displays a number and has buttons to increment and decrement the count.",
    examples: [
      {
        input: "Initial count: 0",
        output: "Counter with '+' and '-' buttons that increases/decreases count",
        explanation: "Clicking '+' should increase the count by 1, and clicking '-' should decrease it by 1."
      }
    ]
  };

  // Sample files
  const [files, setFiles] = useState([
    {
      name: 'Counter.js',
      content: `import React, { useState } from 'react';

function Counter() {
  // Your implementation here
  
  return (
    <div>
      {/* Your UI here */}
    </div>
  );
}

export default Counter;`,
      language: 'javascript'
    },
    {
      name: 'App.js',
      content: `import React from 'react';
import Counter from './Counter';

function App() {
  return (
    <div className="App">
      <h1>Counter App</h1>
      <Counter />
    </div>
  );
}

export default App;`,
      language: 'javascript'
    },
    {
      name: 'index.css',
      content: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.counter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 300px;
}

.counter-display {
  font-size: 3rem;
  margin: 1rem 0;
}

.counter-controls {
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border: none;
  background-color: #0070f3;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0051a9;
}`,
      language: 'css'
    }
  ]);

  const [activeFile, setActiveFile] = useState('Counter.js');
  const [output, setOutput] = useState([
    { type: 'info', content: 'Welcome to the React Playground!' },
    { type: 'info', content: 'Edit the files and click "Run" to see the results.' }
  ]);
  
  const [previewHtml, setPreviewHtml] = useState('');

  const handleFileSelect = (fileName) => {
    setActiveFile(fileName);
  };

  const handleCodeChange = (newCode) => {
    setFiles(files.map(file => 
      file.name === activeFile ? { ...file, content: newCode } : file
    ));
  };

  const runCode = () => {
    setOutput(prev => [...prev, { type: 'command', content: '> npm start' }]);
    
    // In a real application, you would compile the code and render it
    // For this example, we'll just create a basic HTML structure with the files embedded
    
    try {
      // This is a simplified version - in a real app, you'd use a bundler like webpack
      const counterFile = files.find(f => f.name === 'Counter.js');
      const appFile = files.find(f => f.name === 'App.js');
      const cssFile = files.find(f => f.name === 'index.css');
      
      if (!counterFile || !appFile) {
        throw new Error('Required files are missing!');
      }
      
      // Check if Counter.js has a useState implementation
      const hasState = counterFile.content.includes('useState');
      const hasReturnJSX = counterFile.content.includes('return') && 
                           (counterFile.content.includes('<div>') || 
                            counterFile.content.includes('<>'));
      
      if (!hasState || !hasReturnJSX) {
        throw new Error('Your Counter component needs to use useState and return JSX!');
      }
      
      // Simple HTML to embed our React app (in a real app, you'd use a proper bundler)
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>${cssFile.content}</style>
        </head>
        <body>
          <div id="root"></div>
          <script>
            // This is just a mock preview - in a real app, you would compile the React code properly
            document.getElementById('root').innerHTML = '<div><h1>Counter App</h1><div class="counter-container"><div class="counter-display">0</div><div class="counter-controls"><button>-</button><button>+</button></div></div></div>';
          </script>
        </body>
        </html>
      `;
      
      setPreviewHtml(html);
      setOutput(prev => [
        ...prev, 
        { type: 'info', content: 'Compiled successfully!' },
        { type: 'success', content: 'App is running at http://localhost:3000' }
      ]);
    } catch (error) {
      setOutput(prev => [
        ...prev,
        { type: 'error', content: `Error: ${error.message}` }
      ]);
    }
  };

  return (
    <div className={styles.playgroundContainer}>
      <div className={styles.leftPanel}>
        <ProblemStatement problem={problem} />
        <FileExplorer 
          files={files} 
          activeFile={activeFile} 
          onFileSelect={handleFileSelect} 
        />
      </div>
      
      <div className={styles.centerPanel}>
        <div className={styles.editorPanel}>
          <div className={styles.fileTab}>
            {activeFile}
          </div>
          <CodeEditor 
            code={files.find(f => f.name === activeFile).content} 
            onChange={handleCodeChange}
            language={files.find(f => f.name === activeFile).language}
          />
        </div>
        
        <div className={styles.buttonPanel}>
          <button className={styles.runButton} onClick={runCode}>Run</button>
        </div>
        
        <div className={styles.outputPanel}>
          <Terminal output={output} />
        </div>
      </div>
      
      <div className={styles.rightPanel}>
        <Preview html={previewHtml} />
      </div>
    </div>
  );
};

export default PlaygroundPage;