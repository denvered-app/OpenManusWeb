// connected_thinkingManager.js - Manages AI thinking process display

export class ThinkingManager {
    constructor() {
        this.thinkingContainer = document.getElementById('thinking-timeline');
        this.recordCountElement = document.getElementById('record-count');
        this.autoScrollCheckbox = document.getElementById('auto-scroll');
        this.thinkingSteps = [];
    }

    // Initialize the thinking manager
    init() {
        // Initialize record count
        this.updateRecordCount();
    }

    // Add a thinking step
    addThinkingStep(step) {
        this.thinkingSteps.push(step);

        // Create and add step element
        const stepElement = this.createStepElement(step);
        this.thinkingContainer.appendChild(stepElement);

        // Update record count
        this.updateRecordCount();

        // Scroll to bottom if auto-scroll is enabled
        if (this.autoScrollCheckbox.checked) {
            this.scrollToBottom();
        }

        // Fade-in effect
        setTimeout(() => {
            stepElement.style.opacity = 1;
        }, 10);
    }

    // Add multiple thinking steps
    addThinkingSteps(steps) {
        if (!Array.isArray(steps)) return;

        steps.forEach(step => {
            this.addThinkingStep(step);
        });
    }

    // Create step element
    createStepElement(step) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'timeline-item';
        itemDiv.style.opacity = 0; // Initially transparent for fade-in effect

        // Add completed class if it's a conclusion step
        if (step.type === 'conclusion' || step.type === 'completed') {
            itemDiv.classList.add('completed');
        }

        // Create marker
        const markerDiv = document.createElement('div');
        markerDiv.className = 'timeline-marker';
        itemDiv.appendChild(markerDiv);

        // Create content container
        const contentDiv = document.createElement('div');
        contentDiv.className = 'timeline-content';

        // Create header
        const headerDiv = document.createElement('div');
        headerDiv.className = 'timeline-header';
        headerDiv.textContent = this.getStepHeader(step);
        contentDiv.appendChild(headerDiv);

        // If it's a communication type step
        if (step.type === 'communication') {
            const headerDiv = document.createElement('div');
            headerDiv.className = 'communication-header';
            headerDiv.innerHTML = `<span class="communication-direction">${step.message}</span> <span class="toggle-icon">▶</span>`;
            headerDiv.onclick = function() {
                const detailsElement = this.nextElementSibling;
                const toggleIcon = this.querySelector('.toggle-icon');

                if (detailsElement.style.display === 'none' || !detailsElement.style.display) {
                    detailsElement.style.display = 'block';
                    toggleIcon.textContent = '▼';
                } else {
                    detailsElement.style.display = 'none';
                    toggleIcon.textContent = '▶';
                }
            };

            const detailsElement = document.createElement('div');
            detailsElement.className = 'timeline-details';
            detailsElement.style.display = 'none';

            if (step.details) {
                detailsElement.textContent = step.details;
            } else {
                detailsElement.textContent = '(No details available)';
            }

            contentDiv.appendChild(headerDiv);
            contentDiv.appendChild(detailsElement);
        }
        // If there are details, add details button and content
        else if (step.details) {
            // Create details button
            const detailsButton = document.createElement('button');
            detailsButton.className = 'btn-details';
            detailsButton.textContent = 'Show Details ▼';
            contentDiv.appendChild(detailsButton);

            // Create details content (initially hidden)
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'timeline-details';
            detailsDiv.style.display = 'none';
            detailsDiv.textContent = step.details;
            contentDiv.appendChild(detailsDiv);

            // Bind details button click event
            detailsButton.addEventListener('click', () => {
                if (detailsDiv.style.display === 'none') {
                    detailsDiv.style.display = 'block';
                    detailsButton.textContent = 'Hide Details ▲';
                } else {
                    detailsDiv.style.display = 'none';
                    detailsButton.textContent = 'Show Details ▼';
                }
            });
        }

        // If it's a file generation step, add file list
        if (step.files && step.files.length > 0) {
            const fileListDiv = document.createElement('div');
            fileListDiv.className = 'file-list';
            fileListDiv.textContent = step.files.join(', ');
            contentDiv.appendChild(fileListDiv);
        }

        itemDiv.appendChild(contentDiv);
        return itemDiv;
    }

    // Get step header
    getStepHeader(step) {
        if (step.message) {
            return step.message;
        }

        switch (step.type) {
            case 'thinking':
                return step.content || 'Thinking Process';
            case 'tool':
                return `Using Tool: ${step.tool || ''}`;
            case 'file':
                return `Generated ${step.files ? step.files.length : 0} files in workspace ${step.workspace || ''}:`;
            case 'conclusion':
            case 'completed':
                return `Task completed! Results generated in workspace ${step.workspace || ''}.`;
            case 'error':
                return `Error occurred: ${step.error || ''}`;
            case 'system':
                return step.content || 'System Message';
            case 'system_log':
                return step.message || 'System Log';
            case 'progress':
                return `Executing step ${step.current}/${step.total}`;
            case 'communication':
                return step.message || 'Communication';
            default:
                return step.content ? step.content.substring(0, 50) + (step.content.length > 50 ? '...' : '') : 'Thinking Step';
        }
    }

    // Update record count
    updateRecordCount() {
        if (this.recordCountElement) {
            this.recordCountElement.textContent = `${this.thinkingSteps.length} Records`;
        }
    }

    // Clear all thinking records
    clearThinking() {
        this.thinkingSteps = [];
        this.thinkingContainer.innerHTML = '';
        this.updateRecordCount();
    }

    // Scroll to bottom
    scrollToBottom() {
        this.thinkingContainer.scrollTop = this.thinkingContainer.scrollHeight;
    }
}