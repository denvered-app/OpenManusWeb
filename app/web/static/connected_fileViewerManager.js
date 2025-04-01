// connected_fileViewerManager.js - Manages file content viewing
export class FileViewerManager {
    constructor() {
        this.fileViewer = document.getElementById('file-viewer');
        this.fileName = document.getElementById('file-name');
        this.fileContent = document.getElementById('file-content');
        this.closeButton = document.getElementById('close-file-viewer');
    }

    // Initialize file viewer
    init() {
        // Initially hide file viewer
        this.hideFileViewer();
        // Bind close button event
        this.closeButton.addEventListener('click', () => {
            this.hideFileViewer();
        });
    }

    // Show file content
    showFile(name, content) {
        // Set file name
        this.fileName.textContent = name;
        // Set file content, format based on file type
        const formattedContent = this.formatCode(content, this.getFileType(name));
        this.fileContent.textContent = formattedContent;
        // Apply syntax highlighting based on file type
        this.applySyntaxHighlighting(name);
        // Show file viewer
        this.fileViewer.style.display = 'block';
    }

    // Hide file viewer
    hideFileViewer() {
        this.fileViewer.style.display = 'none';
    }

    // Get file type
    getFileType(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        return extension;
    }

    // Apply syntax highlighting
    applySyntaxHighlighting(fileName) {
        // Get file extension
        const extension = this.getFileType(fileName);
        // Set base class name
        this.fileContent.className = 'file-content';
        // Add language-specific class name
        switch (extension) {
            case 'html':
                this.fileContent.classList.add('language-html');
                break;
            case 'css':
                this.fileContent.classList.add('language-css');
                break;
            case 'js':
                this.fileContent.classList.add('language-javascript');
                break;
            case 'py':
                this.fileContent.classList.add('language-python');
                break;
            case 'json':
                this.fileContent.classList.add('language-json');
                break;
            case 'md':
                this.fileContent.classList.add('language-markdown');
                break;
            default:
                this.fileContent.classList.add('language-plaintext');
                break;
        }
        // If Prism.js is available, trigger syntax highlighting
        if (window.Prism) {
            window.Prism.highlightElement(this.fileContent);
        }
    }

    // Format code
    formatCode(code, language) {
        // Simple code formatting, can be extended as needed
        if (!code) return '';
        // Simple formatting for HTML
        if (language === 'html') {
            return this.formatHTML(code);
        }
        // Format JSON
        if (language === 'json') {
            try {
                const obj = JSON.parse(code);
                return JSON.stringify(obj, null, 2);
            } catch (e) {
                return code;
            }
        }
        return code;
    }

    // Format HTML
    formatHTML(html) {
        // Simple HTML formatting
        let formatted = '';
        let indent = 0;
        // Split HTML tags into array
        const tags = html.split(/(<\/?[^>]+>)/g);
        for (let i = 0; i < tags.length; i++) {
            const tag = tags[i];
            // If closing tag, decrease indent
            if (tag.match(/^<\//)) {
                indent--;
            }
            // Add appropriate indentation
            if (tag.match(/^</) && !tag.match(/^<\//) && !tag.match(/\/>/)) {
                formatted += ' '.repeat(indent) + tag + '\n';
                indent++;
            } else if (tag.match(/^</) && tag.match(/\/>/)) {
                // Self-closing tag
                formatted += ' '.repeat(indent) + tag + '\n';
            } else if (tag.match(/^<\//)) {
                // Closing tag
                formatted += ' '.repeat(indent) + tag + '\n';
            } else if (tag.trim() !== '') {
                // Text content
                formatted += ' '.repeat(indent) + tag + '\n';
            }
        }
        return formatted;
    }
}