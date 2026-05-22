// Generated from GH_300/GH-300_Pro.html.
// Keep question content here so the app shell can support many certifications.

export const gh300Questions = [
      {
        text: "What practices enhance the quality of suggestions provided by GitHub Copilot? Select 3.",
        choices: [
          "Including personal information in the code comments.",
          "Clearly defining the problem or task.",
          "Using a .gitignore file to exclude irrelevant files.",
          "Using meaningful variable names.",
          "Providing examples of desired output."
        ],
        correct: [1, 3, 4],
        multiple: true
      },
      {
        text: "How does GitHub Copilot identify matching code and ensure that public code is appropriately handled or blocked? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Implementing safeguards to detect and avoid suggesting verbatim snippets from public code.",
          "Filtering out suggestions that match code from public repositories.",
          "Using machine learning models trained only on private repositories.",
          "Reviewing and storing user-specific private repository data for future suggestions."
        ],
        correct: [0, 1],
        multiple: true
      },
      {
        text: "Which of the following does GitHub Copilot's LLM derive context from when producing a response?",
        choices: [
          "Frequency of commits to the repository.",
          "The syntax highlighting scheme of the code in the IDE.",
          "Neighboring or related files within a project.",
          "The version control system integrated with the IDE."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "How does GitHub Copilot utilize chat history to enhance its code completion capabilities?",
        choices: [
          "By sharing chat history with third-party services to improve integration and functionality.",
          "By analyzing past chat interactions to identify common programming patterns and errors.",
          "By logging chat history to monitor user activity and ensure compliance with coding standards.",
          "By using chat history to offer personalized code snippets based on previous prompts."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "What is the impact of the Fill-in-the-Middle (FIM) technique on GitHub Copilot's code suggestions?",
        choices: [
          "Improves suggestions by considering both the prefix and suffix of the code, filling in the middle part more accurately.",
          "Restricts Copilot to use only external databases for generating code suggestions.",
          "Allows Copilot to generate suggestions based only on the prefix of the code.",
          "Ignores both the prefix and suffix of the code, focusing only on user comments for context."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "How does GitHub Copilot typically handle code suggestions that involve deprecated features or syntax of programming languages?",
        choices: [
          "GitHub Copilot always filters out deprecated elements to promote the use of current standards.",
          "GitHub Copilot may suggest deprecated syntax or features if they are present in its training data.",
          "GitHub Copilot rejects all prompts involving deprecated features to avoid compilation errors.",
          "GitHub Copilot automatically updates deprecated features in its suggestions to the latest version."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What are the additional checks that need to pass before the GitHub Copilot responses are submitted to the user? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Code quality.",
          "Compatibility with user-specific settings.",
          "Performance benchmarking.",
          "Suggestions matching public code (optional, based on settings)."
        ],
        correct: [1, 3],
        multiple: true
      },
      {
        text: "What is a likely effect of GitHub Copilot being trained on commonly used code patterns?",
        choices: [
          "Suggest completely novel projects while reducing time on a project.",
          "Suggest innovative coding solutions that are not yet popular.",
          "Suggest homogeneous solutions if provided a diverse data set.",
          "Suggest code snippets that reflect the most common practices in the training data."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "What role does the pre-processing of user input play in the data flow of GitHub Copilot Chat?",
        choices: [
          "It formats the output response before presenting it to the user.",
          "It filters out irrelevant information from the user's input prompt.",
          "It enriches the input prompt with additional context before passing it to the language model.",
          "It directly generates a response based on the user's input prompt."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "What is the primary purpose of organization audit logs in GitHub Copilot Business?",
        choices: [
          "To track the number of lines of code suggested by Copilot.",
          "To assign software licenses within the organization.",
          "To monitor code conflicts across repositories.",
          "To monitor administrator activities and actions within the organization."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "If you are working on open-source projects, how is GitHub Copilot Individual paid?",
        choices: [
          "Through an invoice or a credit card.",
          "Through an Azure subscription.",
          "Based on the payment method in your user profile.",
          "Not applicable — Copilot Individual is a free service for all open-source projects."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "What types of content can GitHub Copilot knowledge bases answer questions about? Each correct answer presents part of the solution. Choose 3.",
        choices: [
          "Compiled binaries.",
          "Code snippets.",
          "Design patterns.",
          "Screenshots.",
          "Documentation."
        ],
        correct: [1, 2, 4],
        multiple: true
      },
      {
        text: "How can the insights gained from the metrics API be used to improve the development process in conjunction with GitHub Copilot? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Real-time debugging and error resolution statistics.",
          "Automated generation of complete project documentation.",
          "Detailed analysis of GitHub Copilot suggestions versus manual coding.",
          "Insights on the types of coding languages where GitHub Copilot is most helpful."
        ],
        correct: [2, 3],
        multiple: true
      },
      {
        text: "What are the different ways to give context to GitHub Copilot to get more precise responses? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Engage with chat participants such as @workspace to incorporate collaborative context into the responses.",
          "Access developers' previous projects and code repositories to understand their coding style without explicit permission.",
          "Utilize AI to interpret developers' thoughts and intentions without any code or comments.",
          "Utilize chat variables like #file and #editor to anchor the conversation within the specific context of the files or editors in use."
        ],
        correct: [0, 3],
        multiple: true
      },
      {
        text: "Select a strategy to increase the performance of GitHub Copilot Chat.",
        choices: [
          "Use a single GitHub Copilot Chat query to find resolutions for the collection of technical requirements.",
          "Limit the number of concurrent users accessing GitHub Copilot Chat.",
          "Apply prompt engineering techniques to be more specific.",
          "Optimize the usage of memory-intensive operations within generated code."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "Which GitHub Copilot plan could an Azure DevOps organization use without requiring a GitHub Enterprise license?",
        choices: [
          "GitHub Copilot Enterprise.",
          "GitHub Copilot for Azure DevOps.",
          "Copilot Teams.",
          "GitHub Copilot Individual."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is zero-shot prompting?",
        choices: [
          "Giving GitHub Copilot examples of the algorithm and outcome you want to use.",
          "Only giving GitHub Copilot a question as a prompt and no examples.",
          "Giving GitHub Copilot examples of the problem you want to solve.",
          "Giving as little context to GitHub Copilot as possible.",
          "Telling GitHub Copilot it needs to show only the correct answer."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which Copilot Enterprise features are available in all commercially supported IDEs? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Knowledge bases.",
          "A chat interface.",
          "Inline suggestions.",
          "Pull request summaries."
        ],
        correct: [1, 2],
        multiple: true
      },
      {
        text: "When using an IDE with a supported GitHub Copilot plugin, which chat features can be accessed from within the IDE? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Explain code and suggest improvements.",
          "Find out about releases and commits.",
          "Generate unit tests.",
          "Plan coding tasks."
        ],
        correct: [0, 2],
        multiple: true
      },
      {
        text: "What is a benefit of using custom models in GitHub Copilot?",
        choices: [
          "Responses are faster to produce and appear sooner.",
          "Responses use practices and patterns in your repositories.",
          "Responses use the organization's LLM engine.",
          "Responses are guaranteed to be correct."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What type of information can you retrieve through GitHub Copilot Business subscriptions via REST API? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "View code suggestions for a specific user.",
          "List all GitHub Copilot seat assignments for an organization.",
          "Get a summary of GitHub Copilot usage for organization members.",
          "List of all unsubscribed GitHub Copilot members within an organization."
        ],
        correct: [1, 2],
        multiple: true
      },
      {
        text: "Are there any limitations to consider when using GitHub Copilot for code refactoring?",
        choices: [
          "GitHub Copilot may not always produce optimized or best-practice code for refactoring.",
          "GitHub Copilot always produces bug-free code during refactoring.",
          "GitHub Copilot understands the context of your entire project and refactors code accordingly.",
          "GitHub Copilot can only be used with a limited set of programming languages."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Which of the following are true about code suggestions? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Code suggestions are limited to single-line suggestions.",
          "Code suggestions are guaranteed to not expose known security vulnerabilities.",
          "Code suggestions will always compile or run without modifications.",
          "You can use keyboard shortcuts to accept the next word in a suggestion.",
          "Alternative code suggestions can be shown in a new tab."
        ],
        correct: [3, 4],
        multiple: true
      },
      {
        text: "How can users provide feedback about GitHub Copilot Chat using their IDE?",
        choices: [
          "By emailing the support team directly.",
          "Through the share feedback button in the Copilot Chat panel.",
          "By filling out a feedback form on the GitHub website.",
          "By posting on the GitHub forums."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "In what ways can GitHub Copilot contribute to the design phase of the Software Development Life Cycle (SDLC)?",
        choices: [
          "GitHub Copilot can generate user interface prototypes without prompting.",
          "GitHub Copilot can suggest design patterns and best practices relevant to the project.",
          "GitHub Copilot can independently create a complete software design.",
          "GitHub Copilot can manage design team collaboration and version control."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What kind of insights can the GitHub Copilot usage metrics API provide to help evaluate the effectiveness of GitHub Copilot? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "The API can generate detailed reports on code quality improvements made by GitHub Copilot.",
          "The API can track the number of code suggestions accepted and used in the organization.",
          "The API can provide feedback on coding style and standards compliance.",
          "The API can provide Copilot Chat-specific suggestion acceptance metrics.",
          "The API can refactor your code to improve productivity."
        ],
        correct: [1, 3],
        multiple: true
      },
      {
        text: "Which of the following steps correctly demonstrates how to establish an organization-wide policy for GitHub Copilot Business to restrict its use to certain repositories?",
        choices: [
          "Create a copilot.policy file in each repository.",
          "Create a copilot.policy in the .github repository.",
          "Configure the policies in the organization settings.",
          "Apply policies through the GitHub Actions configuration."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "What reasons could apply if code suggestions are not working in your editor? Choose 3.",
        choices: [
          "You do not have an active internet connection.",
          "Your programming language is not supported.",
          "You are working in files included in your .gitignore.",
          "You do not have a valid GitHub Copilot license.",
          "Your content exclusion is active and blocks the use of GitHub Copilot."
        ],
        correct: [0, 1, 3],
        multiple: true
      },
      {
        text: "In what ways can GitHub Copilot support a developer during the code refactoring process? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "By providing suggestions for improving code readability and maintainability based on best practices.",
          "By offering code transformation examples that enhance performance and reduce complexity.",
          "By independently ensuring compliance with regulatory standards across industries.",
          "By autonomously refactoring entire codebases to the latest programming language."
        ],
        correct: [0, 1],
        multiple: true
      },
      {
        text: "When crafting prompts for GitHub Copilot, what is a recommended strategy to enhance the relevance of the generated code?",
        choices: [
          "Keep the prompt as short as possible using single words or brief phrases.",
          "Provide examples of expected input and output within the prompt.",
          "Avoid mentioning the programming language to allow for more flexible suggestions.",
          "Write the prompt in natural language without any programming language."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is one of the recommended practices when using GitHub Copilot Chat to enhance code quality?",
        choices: [
          "Rely solely on Copilot suggestions without reviewing them.",
          "Regularly review and refactor the code suggested by Copilot.",
          "Disable Copilot's inline suggestions.",
          "Avoid using Copilot for complex tasks."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What two options navigate to configure duplicate detection? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Organization settings → Copilot → Policies.",
          "Enterprise settings → Copilot → Policies.",
          "Repository settings → Copilot → Policies.",
          "User settings → Copilot → Policies."
        ],
        correct: [0, 1],
        multiple: true
      },
      {
        text: "Which GitHub Copilot pricing plans include features that exclude your GitHub Copilot data (like usage, prompts, and suggestions) from default training? Choose 2.",
        choices: [
          "GitHub Copilot Code Space.",
          "GitHub Copilot Business.",
          "GitHub Copilot Individual.",
          "GitHub Copilot Enterprise."
        ],
        correct: [1, 3],
        multiple: true
      },
      {
        text: "What specific function does the /fix command perform?",
        choices: [
          "Proposes changes for detected issues, suggesting corrections for syntax errors and programming mistakes.",
          "Converts pseudocode into executable code, optimizing for readability and maintainability.",
          "Generates new code snippets based on language syntax and best practices.",
          "Initiates a code review with static analysis tools for security and logic errors."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is the primary role of the /optimize command in Visual Studio?",
        choices: [
          "Translates code into a more performant language.",
          "Automatically formats the code according to the selected style guide.",
          "Summarizes your documentation into more maintainable and readable formats.",
          "Enhances the performance of the selected code by analyzing its runtime complexity."
        ],
        correct: [3],
        multiple: false,
        warn: "⚠️ Debatable: /optimize is NOT listed in official Copilot Chat slash commands documentation. May be VS-specific or outdated."
      },
      {
        text: "What is used by GitHub Copilot in the IDE to determine the prompt context?",
        choices: [
          "Information from the IDE like open tabs, cursor location, and selected code.",
          "All the code visible in the current IDE.",
          "All the code in the current repository and any Git submodules.",
          "The open tabs in the IDE and the current folder of the terminal."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Where can you validate if GitHub Copilot is not returning suggestions because of content exclusions?",
        choices: [
          "The GitHub Copilot errors panel in your IDE.",
          "The GitHub Copilot logs on github.com under your user settings.",
          "The code suggestions window will display a warning message.",
          "The GitHub Copilot icon in the status bar of the editor will display a message."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "Why is it important to ensure the security of the code used in generative AI (GenAI) tools?",
        choices: [
          "Ensuring code security prevents unauthorized access and potential data breaches.",
          "Ensuring code security enables the AI system to handle larger data sets effectively.",
          "Ensuring code security maintains the integrity of the AI system.",
          "Ensuring code security supports the development of more advanced AI features."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is the correct way to exclude specific files from being used by GitHub Copilot Business during code suggestions?",
        choices: [
          "Rename the files to include the suffix _nocopilot.",
          "Modify the .gitignore file to include the specific files.",
          "Use the GitHub Copilot settings in the user interface to exclude files.",
          "Add the specific files to a .copilotignore file."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "What is the best way to share feedback about GitHub Copilot Chat when using it on GitHub Mobile?",
        choices: [
          "The settings menu in the GitHub Mobile app.",
          "The feedback section on the GitHub website.",
          "Use the emojis in the Copilot Chat interface.",
          "By tweeting at GitHub's official X (formerly Twitter) account."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "Which Microsoft ethical AI principle is aimed at ensuring AI systems treat all people equally?",
        choices: [
          "Privacy and security.",
          "Fairness.",
          "Reliability and safety.",
          "Inclusiveness."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "A social media manager wants to use AI to filter content. How can they promote transparency in the platform's AI operations?",
        choices: [
          "By providing clear explanations about the types of content the AI is designed to filter and how it arrives at its conclusions.",
          "By relying on a well-regarded AI development company.",
          "By regularly updating the AI filtering algorithm.",
          "By focusing on user satisfaction with the content filtering."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What can be done during AI development to minimize bias?",
        choices: [
          "Collect massive amounts of data for training.",
          "Focus on accuracy of the data.",
          "Use diverse data, fairness metrics, and human oversight.",
          "Improve on the computational efficiency and speed."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "What caution should developers exercise when using GitHub Copilot for assistance with mathematical computations?",
        choices: [
          "GitHub Copilot's capability to optimize complex mathematical algorithms beyond manual coding.",
          "GitHub Copilot's ability to execute and verify mathematical results in real time.",
          "GitHub Copilot's automatic update of outdated mathematical formulas to modern standards.",
          "GitHub Copilot's reliance on pattern-based responses without verifying computation accuracy."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "Which of the following GitHub Copilot Business-related activities can be tracked using the organization audit logs?",
        choices: [
          "Changes to content exclusion settings.",
          "Suggestions blocked by duplication detection filtering.",
          "Code suggestions made by GitHub Copilot.",
          "Accepted chat suggestions."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is the main purpose of the duplication detection filter in GitHub Copilot?",
        choices: [
          "To compare user-generated code against a private repository for potential matches.",
          "To encourage the user to follow coding best practices, preventing code duplication.",
          "To allow administrators to control which suggestions are visible to developers based on custom criteria.",
          "To detect and block suggestions that match public code snippets on GitHub if they contain about 150 characters."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "Where is the GitHub Copilot proxy service hosted?",
        choices: [
          "Microsoft Azure.",
          "Amazon Web Services.",
          "Google Cloud Platform.",
          "Self-hosted."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "How does GitHub Copilot suggest code optimizations for improved performance?",
        choices: [
          "By analyzing the codebase and suggesting more efficient algorithms or data structures.",
          "By providing detailed reports on the performance of the codebase.",
          "By automatically rewriting the codebase to use more efficient code.",
          "By enforcing strict coding standards that ensure optimal performance."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Which of the following prompts can be used to guide GitHub Copilot Chat in refactoring code for quality improvements? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Suggest ways to enhance the maintainability of this code segment.",
          "Refactor my application to meet the latest coding standards.",
          "Predict future coding trends and update my codebase accordingly.",
          "Show me how to improve the readability of this function."
        ],
        correct: [0, 3],
        multiple: true
      },
      {
        text: "What is a key consideration when relying on GitHub Copilot Chat's explanations of code functionality and proposed improvements?",
        choices: [
          "The explanations are dynamically updated based on user feedback.",
          "Reviewing and validating the generated output for accuracy and completeness.",
          "GitHub Copilot Chat uses a static database for generating explanations.",
          "The explanations are primarily derived from user-provided documentation."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How does GitHub Copilot assist in writing code?",
        choices: [
          "By providing an interface for drag-and-drop coding.",
          "By automatically writing or deploying code without developer input.",
          "By suggesting entire lines or blocks of code based on context.",
          "By suggesting specific function names like IntelliSense would based on context."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "Your organization wants GitHub Copilot Enterprise to suggest code based on internal coding practices and documentation. Which of the following features should be configured to allow Copilot to access and utilize organization-specific content?",
        choices: [
          "Enabling GitHub Copilot Chat in the IDE.",
          "Setting up GitHub Copilot CLI with access permissions.",
          "Creating and configuring knowledge bases in GitHub Copilot Enterprise.",
          "Activating audit logs for internal repository access tracking."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "How do you generate code suggestions with GitHub Copilot in the CLI?",
        choices: [
          "Write code comments → press the suggestion shortcut → select the best suggestion from the list.",
          "Use 'copilot suggest' → write the command you want → select the best suggestion from the list.",
          "Type out the code snippet → use the Copilot refine command to enhance it → review the suggested command.",
          "Describe the project's architecture → use the Copilot generate command → accept the generated suggestion."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which of the following describes role prompting?",
        choices: [
          "Describing in your prompt what your role is to get a better suggestion.",
          "Giving GitHub Copilot multiple examples of the form of the data you want to use.",
          "Prompting GitHub Copilot to explain what the role of a suggestion was.",
          "Telling GitHub Copilot in what tone of voice it should respond."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Which scenarios can GitHub Copilot Chat be used to increase productivity? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Create a documentation file for the newly created codebase.",
          "Fast-tracking of release management activities to move code to production main branch.",
          "A project plan for the team needs to be generated using a project management software.",
          "A developer is added to a new project and would like to understand the current software code."
        ],
        correct: [0, 3],
        multiple: true
      },
      {
        text: "What is few-shot prompting?",
        choices: [
          "Telling GitHub Copilot to try multiple times to answer the prompt.",
          "Telling GitHub Copilot to iterate several times on the answer before returning it to you.",
          "Telling GitHub Copilot from which sources it should base the response on.",
          "Telling GitHub Copilot about the mechanism you want it to use and how to incorporate that into the response."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "What specific function does the /fix command perform?",
        choices: [
          "Initiates a code review with static analysis tools for security and logic errors.",
          "Converts pseudocode into executable code, optimizing for readability and maintainability.",
          "Generates new code snippets based on language syntax and best practices.",
          "Proposes changes for detected issues, suggesting corrections for syntax errors and programming mistakes."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "Why might a generative AI tool create inaccurate outputs?",
        choices: [
          "The GenAI tool is overloaded with too many requests at once.",
          "The GenAI tool is experiencing downtime and is not fully recovered.",
          "The GenAI tool is programmed with a focus on creativity over factual accuracy.",
          "The training data might contain biases or inconsistencies."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "In which of the following scenarios is GitHub Copilot Chat most effectively utilized?",
        choices: [
          "Asking questions about project-specific code behavior.",
          "Generating pull request summaries.",
          "Configuring organization-wide access controls.",
          "Viewing repository audit logs."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What are two techniques that can be used to improve prompts to GitHub Copilot? Select 2.",
        choices: [
          "Provide links to supporting documentation.",
          "Provide specific success criteria.",
          "Provide all information about the utilized files.",
          "Provide insight on where to get the content from to get a response."
        ],
        correct: [1, 3],
        multiple: true
      },
      {
        text: "What GitHub Copilot configuration needs to be enabled to protect against IP infringements?",
        choices: [
          "Blocking license check configuration.",
          "Blocking public code matches.",
          "Allowing license check configuration.",
          "Allowing public code matches."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How can GitHub Copilot assist with code refactoring tasks?",
        choices: [
          "GitHub Copilot can fix syntax errors without user input.",
          "GitHub Copilot can automatically rewrite code to follow best practices.",
          "GitHub Copilot can suggest refactoring improvements for better code quality.",
          "GitHub Copilot can remove unnecessary files from the project directory."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You're introducing a new team member to GitHub Copilot. They ask about the different ways to interact with or trigger Copilot's suggestions. Which of the following methods are valid ways to use or activate GitHub Copilot? Select 4.",
        choices: [
          "Typing comments or partial code lines to receive inline suggestions.",
          "Opening the Copilot chat pane to ask natural language queries.",
          "Triggering multiple suggestions using keyboard shortcuts.",
          "Asking Copilot to deploy directly to production.",
          "Using GitHub Copilot CLI for command-line code assistance."
        ],
        correct: [0, 1, 2, 4],
        multiple: true
      },
      {
        text: "An organization wants to adopt GitHub Copilot to support their developers in writing code. Which of the following statements best describes the responsible AI operation?",
        choices: [
          "Enabling Copilot to commit the code directly into the prod branch without the developer's interference to increase ops speed.",
          "Relying solely on Copilot to write unit tests.",
          "Implementing a human code review process to ensure accountability and security checks alongside Copilot-generated code.",
          "Disabling manual intervention to completely make the development cycle automated."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "What is GitHub Copilot primarily designed for?",
        choices: [
          "It's designed as a tool for managing GitHub repositories.",
          "It's an AI-powered coding assistant to augment a developer's capabilities.",
          "It's software for automatic code testing and deployment.",
          "It's a platform for collaborative coding and project management."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What are the potential limitations of GitHub Copilot in maintaining existing codebases?",
        choices: [
          "GitHub Copilot's suggestions are always aware of the entire codebase.",
          "GitHub Copilot can refactor and optimize the entire codebase up to 10,000 lines of code.",
          "GitHub Copilot can independently manage and resolve all merge conflicts in version control.",
          "GitHub Copilot might not fully understand the context and dependencies within a large codebase."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "How does the /test command assist developers?",
        choices: [
          "Constructs detailed test documentation.",
          "Creates unit tests for the selected code.",
          "Integrates with external testing frameworks.",
          "Executes test cases to find issues with the code."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which of the following is a limitation of GitHub Copilot? Select 2.",
        choices: [
          "It cannot integrate with any Integrated Development Environments (IDEs).",
          "It only functions with a few specific programming languages.",
          "Suggestions may sometimes be outdated or include security vulnerabilities.",
          "It requires an internet connection to function."
        ],
        correct: [2, 3],
        multiple: true
      },
      {
        text: "What do you check when GitHub Copilot content exclusions are not working? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "If GitHub Copilot can connect to the server selected in your user settings.",
          "If the user is in an organization that has content exclusions configured.",
          "If the content exclusion settings changed in the last 30 minutes or before that.",
          "If the user is part of the content exclusion team that limits the use of content exclusions."
        ],
        correct: [1, 2],
        multiple: true
      },
      {
        text: "What content can be configured to be excluded with content exclusions? Each correct answer presents part of the solution. Choose 3.",
        choices: [
          "Gists.",
          "Repositories.",
          "Files.",
          "Lines and files.",
          "Folders."
        ],
        correct: [1, 2, 4],
        multiple: true
      },
      {
        text: "Which of the following is a key feature of GitHub Copilot's recent updates?",
        choices: [
          "Copilot has started supporting all programming languages uniformly.",
          "Copilot can now use related files for context, not just the current file.",
          "Copilot now offers real-time collaboration features.",
          "Copilot now provides automatic debugging for any code it generates."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How does GitHub Copilot Chat utilize its training data and external sources to generate responses when answering coding questions?",
        choices: [
          "It combines its training dataset, code in user repositories, and external sources like Bing to generate responses.",
          "It primarily relies on the model's training data to generate responses.",
          "It primarily uses search results from Bing to generate responses.",
          "It uses user-provided documentation exclusively to generate responses."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "How can GitHub Copilot assist developers during the requirements analysis phase of the Software Development Lifecycle (SDLC)?",
        choices: [
          "By managing stakeholder communication and meetings.",
          "By identifying and fixing potential requirement conflicts when using /help.",
          "By providing templates and code snippets that help in documenting requirements.",
          "By automatically generating detailed requirements documents."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "GitHub Copilot in the Command Line Interface (CLI) can be used to configure the following settings. Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "The default execution confirmation.",
          "Usage analytics.",
          "The default editor.",
          "GitHub CLI subcommands."
        ],
        correct: [0, 1],
        multiple: true
      },
      {
        text: "When can GitHub Copilot still use content that was excluded using content exclusion?",
        choices: [
          "When the user prompts with @workspace.",
          "When the repository-level settings allow overrides by the user.",
          "If the content exclusion was configured at the enterprise level and is overwritten at the organization level.",
          "If the contents of an excluded file are referenced in code that is not excluded (e.g., function calls)."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "What are the potential risks associated with relying heavily on code generated from GitHub Copilot? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "GitHub Copilot may introduce security vulnerabilities by suggesting code with known exploits.",
          "GitHub Copilot may decrease developer velocity by requiring too much time in prompt engineering.",
          "GitHub Copilot's suggestions may not always reflect best practices or the latest coding standards.",
          "GitHub Copilot may increase development lead time by providing irrelevant suggestions."
        ],
        correct: [0, 2],
        multiple: true
      },
      {
        text: "What are the potential limitations of GitHub Copilot Chat? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Difficulty handling complex code structures.",
          "Limited training data.",
          "Extensive support for all programming languages.",
          "No biases in code suggestions."
        ],
        correct: [0, 1],
        multiple: true
      },
      {
        text: "A company is currently storing code in Bitbucket and would like to use GitHub Copilot. Which GitHub Copilot plan will be most cost-effective to allow them to manage users with their identity provider?",
        choices: [
          "GitHub Copilot Business for non-GHE customers.",
          "GitHub Copilot Individual.",
          "GitHub Copilot Enterprise.",
          "GitHub Copilot Teams."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is the correct way to access the audit log events for GitHub Copilot Business?",
        choices: [
          "Use the Audit Log section in the organization's GitHub settings.",
          "Use the Code tab in the GitHub repository.",
          "Navigate to the Insights tab in the Repository settings.",
          "Navigate to the Security tab in the organization's GitHub settings."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Which of the following is a risk associated with using AI?",
        choices: [
          "AI algorithms are incapable of perpetuating existing biases.",
          "AI systems can sometimes make decisions that are difficult to interpret.",
          "AI eliminates the need for data privacy regulations.",
          "AI replaces the need for developer opportunities in most fields."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "A large enterprise wants to enhance the code assistant's support for their developers by incorporating internal code standards and best practices into GitHub Copilot. The IT team is also looking for scalable AI assistance with enterprise-level data management and governance. Which of the following plans can best accommodate this requirement?",
        choices: [
          "GitHub Copilot for Individual.",
          "GitHub Copilot for Business.",
          "GitHub Copilot for Enterprise.",
          "GitHub Copilot Business for Non-GitHub Hosted Repositories."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "How can GitHub Copilot be limited when it comes to suggesting unit tests?",
        choices: [
          "GitHub Copilot can generate all types of unit tests, including those for edge cases and complex integration scenarios.",
          "GitHub Copilot primarily suggests basic unit tests that focus on core functionalities, often requiring additional input from developers for comprehensive coverage.",
          "GitHub Copilot can handle any complexity in code and automatically generate appropriate unit tests.",
          "GitHub Copilot's limitations in generating unit tests can vary based on the IDE version you are using."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What GitHub Copilot feature can be configured at the organization level to prevent GitHub Copilot suggesting publicly available code snippets?",
        choices: [
          "GitHub Copilot Access to Bing.",
          "GitHub Copilot Duplication Detection Filter.",
          "GitHub Copilot Chat in the IDE.",
          "GitHub Copilot Chat in GitHub Mobile."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which of the following statements correctly describes how GitHub Copilot Individual uses prompt data? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Real-time user input helps generate context-aware code suggestions.",
          "Prompt data is used internally by GitHub for improving the search engine.",
          "Prompt data is used to train machine learning models for better code suggestions.",
          "Prompt data is stored unencrypted for faster processing."
        ],
        correct: [0, 2],
        multiple: true,
        warn: "⚠️ Debatable: Training on prompt data is now OPT-IN only for Individual plan. Default changed — no longer used for training unless user opts in."
      },
      {
        text: "Which of the following scenarios best describes the intended use of GitHub Copilot Chat as a tool?",
        choices: [
          "A productivity tool that provides suggestions, but relying on human judgment.",
          "A complete replacement for developers generating code.",
          "A solution for software development, requiring no additional input or oversight.",
          "A tool solely designed for debugging and error correction."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What are two techniques that can be used to improve prompts to GitHub Copilot? Choose 2.",
        choices: [
          "Provide specific success criteria.",
          "Provide all information about the utilized files.",
          "Provide insight on where to get the content from to get a response.",
          "Provide links to supporting documentation."
        ],
        correct: [0, 2],
        multiple: true
      },
      {
        text: "When using GitHub Copilot to identify missing tests in your codebase, which of the following is the most important factor to consider?",
        choices: [
          "Having a high test coverage percentage in the codebase.",
          "Using well-known coding practices in your repository.",
          "Ensuring that the correct context is available to GitHub Copilot.",
          "Closing all tabs in your IDE that do not have tests in them."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "A team is using GitHub Copilot Individual in their daily development activities. They need to exclude specific files from being used to inform code completion suggestions. How can they achieve this?",
        choices: [
          "Upgrade to Copilot Business.",
          "Add a .gitignore file to the repo.",
          "Have an organization owner configure content exclusions.",
          "Have a repo administrator configure content exclusions.",
          "Use the #file chat variable to exclude the files."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "In what way can GitHub Copilot and GitHub Copilot Chat aid developers in modernizing applications?",
        choices: [
          "GitHub Copilot can directly convert legacy applications into cloud-native architectures.",
          "GitHub Copilot can suggest modern programming patterns based on your code.",
          "GitHub Copilot can create and deploy full-stack applications based on a single query.",
          "GitHub Copilot can refactor applications to align with upcoming standards."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How is GitHub Copilot Individual billed? Choose 2.",
        choices: [
          "Monthly as a subscription.",
          "Annually as a subscription.",
          "Monthly, as a metered service based on actual consumption.",
          "Free — not billed for all open-source projects."
        ],
        correct: [0, 1],
        multiple: true
      },
      {
        text: "Which of the following is correct about GitHub Copilot knowledge bases?",
        choices: [
          "All repos are indexed.",
          "Indexing is static.",
          "It is an enterprise feature.",
          "All file types are indexed."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "How can you use GitHub Copilot to get inline suggestions for refactoring your code? Select 2.",
        choices: [
          "By adding comments to your code and triggering a suggestion.",
          "By highlighting the code you want to fix, right-clicking, and selecting 'Fix using GitHub Copilot'.",
          "By running the gh copilot fix command.",
          "By using the /fix command in GitHub Copilot inline chat.",
          "By highlighting the code you want to fix, right-clicking, and selecting 'Refactor using GitHub Copilot'."
        ],
        correct: [0, 4],
        multiple: true
      },
      {
        text: "What is the role of docstrings in the context of using GitHub Copilot for software development?",
        choices: [
          "To define the programming language for Copilot.",
          "To serve as multi-line comments for guiding Copilot.",
          "To automatically generate code without developer input.",
          "To act as placeholders for future code sections."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is the process behind identifying public code matches when using a public code filter enabled in GitHub Copilot?",
        choices: [
          "Running code suggestions through filters designed to detect public code.",
          "Comparing suggestions against public code using machine learning.",
          "Analyzing the context and structure of the code being written.",
          "Reviewing the user's browsing history to identify public repositories."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "When using GitHub Copilot Chat to generate boilerplate code for various test types, how can you guide the AI to follow the testing standards of your company?",
        choices: [
          "By using a specific slash command in the prompt.",
          "By using a specific command in the terminal.",
          "By using a specific setting in GitHub Copilot's configuration.",
          "By using specific prompt examples in your chat request."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "Which Microsoft ethical AI principle is aimed at ensuring AI systems treat all people equally?",
        choices: [
          "Privacy and security.",
          "Fairness.",
          "Reliability and safety.",
          "Inclusiveness."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What role does Chat History play in GitHub Copilot's code suggestions?",
        choices: [
          "Chat History is used to train the GitHub Copilot model in real-time.",
          "Chat History provides context to GitHub Copilot, improving the relevance and accuracy of its code suggestions.",
          "Chat History is stored and shared with other users to enhance collaboration.",
          "Chat History is irrelevant to GitHub Copilot and does not affect its functionality."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is the correct sequence of steps to install GitHub Copilot CLI on a developer's system?",
        choices: [
          "Install GitHub CLI → run 'gh extension install github/gh-copilot' → authenticate using 'gh auth login'.",
          "Run 'npm install copilot' → create a GitHub repo → configure settings.",
          "Download GitHub Desktop → install Copilot from the marketplace → log in with SSO.",
          "Install VS Code → enable the Copilot extension → clone a repository."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Identify the right use cases where GitHub Copilot Chat is most effective. Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Creation of a unit test scenario for newly developed Python code.",
          "Creation of end-to-end performance testing scenarios for a web application.",
          "Create a technical requirement specification from the business requirement documentation.",
          "Explain a legacy COBOL code and translate the code to another language like Python."
        ],
        correct: [0, 3],
        multiple: true
      },
      {
        text: "You are using GitHub Copilot under an individual plan within Visual Studio Code. Which of the following is a core feature available to you under this plan?",
        choices: [
          "Organization-wide policy settings and audit logs.",
          "Context-aware code suggestions while typing.",
          "Access to centralized knowledge bases across your company.",
          "Integration with GitHub Enterprise Server (GHES)."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How can you get multiple suggestions from GitHub Copilot?",
        choices: [
          "By asking for multiple suggestions using comments in your code.",
          "By opening the completions panel in your editor.",
          "By using the inline chat functionality with the command /multiple.",
          "By using @workspace in the chat window."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What method can be used to interact with GitHub Copilot?",
        choices: [
          "By using a properly configured GitHub CLI.",
          "By using chat capabilities in Neovim.",
          "From a watch window in an IDE debug session.",
          "From a web browser at https://github.copilot.com."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which principle emphasizes that AI systems should be understandable and provide clear information on how they work?",
        choices: [
          "Fairness.",
          "Transparency.",
          "Inclusiveness.",
          "Accountability."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What configuration needs to be set to get help from Microsoft and GitHub protecting against IP infringement while using GitHub Copilot?",
        choices: [
          "Suggestions matching public code to be blocked.",
          "Enforce blocking of MIT or GPL license code.",
          "You need to check code suggestions yourself before accepting.",
          "Enable GitHub Copilot license checking."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "How does GitHub Copilot Chat ensure that a function works correctly?",
        choices: [
          "By suggesting assertions based on the code's context and semantics.",
          "By automatically writing all the tests for the function.",
          "By writing the implementation code for the function.",
          "By executing the test cases to validate the correctness of the code."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is the limitation of content exclusions?",
        choices: [
          "Content exclusions can be worked around as it is only available for Git repositories.",
          "Repository administrators and organization owners cannot manage content exclusion settings.",
          "Content exclusions are only available in the GitHub Copilot Individual plan.",
          "Content exclusions can only be configured by an enterprise administrator."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What GitHub Copilot pricing plan gives you access to your company's knowledge bases?",
        choices: [
          "GitHub Copilot Business.",
          "GitHub Copilot Enterprise.",
          "GitHub Copilot Individual.",
          "GitHub Copilot Professional."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which of the following is a limitation of GitHub Copilot? Select 2.",
        choices: [
          "It cannot integrate with any integrated development environments (IDEs).",
          "It only functions with a few specific programming languages.",
          "Suggestions may sometimes be outdated or include security vulnerabilities.",
          "It requires an internet connection to function."
        ],
        correct: [2, 3],
        multiple: true
      },
      {
        text: "How long does it take for content exclusion settings to take effect or be updated?",
        choices: [
          "Up to 30 minutes.",
          "45 to 60 minutes.",
          "60 to 90 minutes.",
          "24 hours."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What method can a developer use to generate sample data with GitHub Copilot? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Utilizing GitHub Copilot's ability to create fictitious information from patterns in training data.",
          "Leveraging GitHub Copilot's ability to independently initiate and manage data storage services.",
          "Utilizing GitHub Copilot's capability to directly access and use databases to create sample data.",
          "Leveraging GitHub Copilot suggestions to create data based on API documentation in the repository."
        ],
        correct: [0, 3],
        multiple: true
      },
      {
        text: "How can the concept of fairness be integrated into the process of operating an AI tool?",
        choices: [
          "Training AI data and algorithms to be free from biases will ensure fairness.",
          "Focusing on accessibility will ensure fairness.",
          "Focusing on collecting large data sets for training will ensure fairness.",
          "Regularly monitoring the AI tool's performance will ensure fairness in its outputs."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "Which Copilot Individual features are available when using a supported extension for Visual Studio, VS Code, or JetBrains IDEs? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Code suggestions.",
          "A chat interface.",
          "Knowledge base access.",
          "Pull request diff analysis."
        ],
        correct: [0, 1],
        multiple: true
      },
      {
        text: "Which GitHub Copilot plan allows for prompt and suggestion collection?",
        choices: [
          "GitHub Copilot Individual.",
          "GitHub Copilot Business.",
          "GitHub Copilot Enterprise.",
          "GitHub Copilot Code Space."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "How can GitHub Copilot aid developers in writing documentation for their code?",
        choices: [
          "GitHub Copilot can suggest summaries or descriptions based on the code's functionality.",
          "GitHub Copilot can only generate content in Markdown format.",
          "GitHub Copilot can automatically generate complete and detailed documentation.",
          "GitHub Copilot cannot assist in writing documentation or comments."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Your development team is concerned about the use of proprietary code in GitHub Copilot's training dataset. To maintain privacy and protect intellectual property, they want to ensure that specific files or directories are not used by GitHub Copilot for training purposes. What should they configure to achieve this?",
        choices: [
          "Use the .copilotignore file to list files or paths to be excluded from Copilot context and training.",
          "Add the files to .gitignore so Copilot doesn't access them.",
          "Disable GitHub Copilot entirely from the organization settings.",
          "Place a comment in the file indicating it is confidential."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "How can GitHub Copilot assist in maintaining consistency across your tests?",
        choices: [
          "By providing documentation references based on industry best practices.",
          "By automatically fixing all tests in the code based on the context.",
          "By identifying a pattern in the way you write tests and suggesting similar patterns for future tests.",
          "By writing the implementation code for the function based on context."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "What should developers consider when relying on GitHub Copilot for generating code that involves statistical analysis?",
        choices: [
          "GitHub Copilot can independently verify the statistical significance of results.",
          "GitHub Copilot can design new statistical methods that have not been previously documented.",
          "GitHub Copilot suggestions are based on statistical trends and may not always apply accurately to specific data sets.",
          "GitHub Copilot will automatically correct any statistical errors found in the user's initial code."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "What are the effects of content exclusions? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "The IDE will not count coding suggestions in the excluded content.",
          "The excluded content is no longer used while debugging the code.",
          "The excluded content is not directly available to GitHub Copilot to use as context.",
          "GitHub Copilot suggestions are no longer available in the excluded files."
        ],
        correct: [2, 3],
        multiple: true
      },
      {
        text: "How can GitHub Copilot facilitate a smoother learning experience when diving into a new programming language? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "The /understand command will help GitHub Copilot understand code written in a targeted programming language.",
          "GitHub Copilot can provide contextualized code suggestions and answer sources from an organization's documentation.",
          "GitHub Copilot Chat can provide guidance and support for common coding tasks and challenges in the targeted programming language.",
          "GitHub Copilot can convert comments into code to grasp the syntax and nuances of a new programming language."
        ],
        correct: [2, 3],
        multiple: true
      },
      {
        text: "Which of the following statements best describes the impact of GitHub Copilot on the software development process?",
        choices: [
          "It decreases software vulnerabilities from third-party dependencies.",
          "It reduces overhead by automating testing workflows.",
          "It increases productivity by automating repetitive coding tasks.",
          "It replaces the need for developers in the software development process."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "How does GitHub Copilot Chat help in understanding the existing codebase?",
        choices: [
          "By running code linters and formatters.",
          "By providing visual diagrams of the code structure.",
          "By answering questions about the code and generating explanations.",
          "By automatically refactoring code to improve readability."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "How can you improve the context used by GitHub Copilot? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "By opening the relevant tabs in your IDE.",
          "By adding relevant code snippets to your prompt.",
          "By adding the important files to your .gitconfig.",
          "By adding the full file paths to your prompt of important files."
        ],
        correct: [0, 1],
        multiple: true
      },
      {
        text: "GitHub Copilot in the Command Line Interface (CLI) can be used to configure which of the following settings? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Usage analytics.",
          "The default editor.",
          "The default execution confirmation.",
          "GitHub CLI subcommands."
        ],
        correct: [0, 2],
        multiple: true
      },
      {
        text: "How does GitHub Copilot assist developers in minimizing context switching?",
        choices: [
          "GitHub Copilot can predict and prevent bugs before they occur.",
          "GitHub Copilot allows developers to stay in their IDE.",
          "GitHub Copilot can completely replace the need for human collaboration.",
          "GitHub Copilot can automatically handle project management tasks."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "A developer is working for an enterprise that hosts all its code on Bitbucket and wants to leverage GitHub Copilot. However, their organization doesn't have any GitHub repositories. Can they still access GitHub Copilot?",
        choices: [
          "No — Copilot can only be used with GitHub repositories.",
          "Yes — by using GitHub Copilot for Business, they can integrate GitHub Copilot with non-GitHub hosted repositories.",
          "Yes — only when the organization migrates their codebase to GitHub from Bitbucket.",
          "No — GitHub Copilot for CLI can only work with GitHub-hosted projects."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "As a developer evaluating the efficiency of GitHub Copilot in generating accurate code across different problem domains, which of the following best describes a core limitation?",
        choices: [
          "Copilot always generates error-free code across all languages.",
          "Copilot reduces the need for STLC and code reviews.",
          "Copilot may return output that reflects bias or inaccurate information because of its training data.",
          "Copilot can only be used offline without internet access."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "While working in Visual Studio Code, a developer notices inline code suggestions appearing as they type. The suggestions seem to adapt based on comments and previously written code. What does this behavior best describe about GitHub Copilot in the IDE?",
        choices: [
          "Copilot uses pre-written or ready-made templates to insert common code blocks.",
          "Copilot generates suggestions only from previously written code in the current file.",
          "Copilot analyzes comments and context to generate real-time code suggestions tailored for your requirements.",
          "Copilot can only operate through command palette triggers, not inline."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "Your company recently adopted GitHub Copilot Business and leadership wants to ensure accountability and transparency in its usage. Which of the following best describes the purpose of audit logs in GitHub Copilot Business?",
        choices: [
          "To monitor and track how Copilot suggestions are accepted or rejected in individual repositories.",
          "To log the activities of users, including who enabled or disabled Copilot and when, across the organization.",
          "To provide real-time assisted debugging support across repositories.",
          "To generate automated summaries for pull requests using organizational knowledge."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How long does GitHub retain Copilot data for Business and Enterprise? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Prompts and suggestions are not retained.",
          "Prompts and suggestions are retained for 28 days.",
          "User engagement data is kept for 2 years.",
          "User engagement data is kept for one year."
        ],
        correct: [1, 2],
        multiple: true,
        warn: "⚠️ Outdated: Official docs now say prompts/suggestions are NOT retained for Business/Enterprise by default. 28-day retention is for abuse detection only."
      },
      {
        text: "How does GitHub Copilot Enterprise assist in code reviews during the pull request process? Select 2.",
        choices: [
          "It automatically merges pull requests after an automated review.",
          "It generates a PR summary and a bulleted list of key changes for pull requests.",
          "It can validate the accuracy of the changes in the pull request.",
          "It can answer questions about the change set of the pull request."
        ],
        correct: [1, 3],
        multiple: true
      },
      {
        text: "Why is code reviewing still necessary when using GitHub Copilot to write tests?",
        choices: [
          "Because GitHub Copilot can cover all possible scenarios in your test cases.",
          "Because GitHub Copilot generates the best code possible for the test scenario.",
          "Because GitHub Copilot's generated test cases may not cover all possible scenarios.",
          "Because GitHub Copilot replaces the need for manual testing."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "What types of prompts or code snippets might be flagged by the GitHub Copilot toxicity filter? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Hate speech or discriminatory language (e.g., racial slurs, offensive stereotypes).",
          "Sexually suggestive or explicit content.",
          "Code that contains logical errors or produces unexpected results.",
          "Code comments containing strong opinions or criticisms."
        ],
        correct: [0, 1],
        multiple: true
      },
      {
        text: "Identify the steps involved in the life cycle of a GitHub Copilot code suggestion. Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Processing telemetry data.",
          "Generate suggestions.",
          "Retraining the model.",
          "Storing user data.",
          "Capturing the user's context."
        ],
        correct: [1, 4],
        multiple: true
      },
      {
        text: "Which of the following are valid and commonly used commands while using GitHub Copilot in the CLI?",
        choices: [
          "gh copilot explain, gh copilot suggest, gh copilot extension list.",
          "copilot.run, copilot.info, copilot.",
          "gh codegen, gh audit, gh summarize.",
          "gh copilot status, gh copilot init, copilot deploy."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Which REST API endpoints are used to modify details about a GitHub Copilot Business subscription? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "Add teams to the Copilot subscription for an organization.",
          "Upgrade or downgrade the subscription tier.",
          "Migrate Copilot seat assignments between GitHub organizations.",
          "Reassign Copilot seats based on GitHub repository size.",
          "Remove teams from the Copilot subscription for an organization."
        ],
        correct: [0, 4],
        multiple: true
      },
      {
        text: "How does GitHub Copilot Chat help to fix security issues in your codebase?",
        choices: [
          "By automatically refactoring the entire codebase to remove vulnerabilities.",
          "By annotating the given suggestions with known vulnerability patterns.",
          "By enforcing strict coding standards that prevent the introduction of vulnerabilities.",
          "By providing detailed reports on the security vulnerabilities present in the codebase."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What kind of insights can the GitHub Copilot usage metrics API provide to help evaluate the effectiveness of GitHub Copilot? Each correct answer presents part of the solution. Choose 2.",
        choices: [
          "The API can generate detailed reports on code quality improvements made by GitHub Copilot.",
          "The API can track the acceptance rate of code suggestions accepted and used in the organization.",
          "The API can refactor your code to improve productivity.",
          "The API can provide feedback on coding style and standards compliance.",
          "The API can provide Copilot Chat-specific suggestion acceptance metrics."
        ],
        correct: [1, 4],
        multiple: true
      },
      {
        text: "Which of the following principles are most closely aligned with ethical AI practices? Select 3.",
        choices: [
          "Ensuring transparency in AI decision-making.",
          "Prioritizing user privacy and security.",
          "Prioritizing speed over security to maximize revenue generation.",
          "Avoiding manual review of AI-generated outputs.",
          "Promoting fairness and minimizing bias in AI models."
        ],
        correct: [0, 1, 4],
        multiple: true
      },
      {
        text: "An independent contractor develops applications for a variety of different customers. Assuming no concerns from their customers, which GitHub Copilot plan is best suited?",
        choices: [
          "GitHub Copilot Individual.",
          "GitHub Copilot Business.",
          "GitHub Copilot Business for non-GH customers.",
          "GitHub Copilot Enterprise.",
          "GitHub Copilot Teams."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "How does GitHub Copilot assist developers in reducing the amount of manual boilerplate code they write?",
        choices: [
          "By refactoring the entire codebase to eliminate boilerplate code without developer input.",
          "By suggesting code snippets that can be reused across different parts of the project.",
          "By engaging in real-time collaboration with multiple developers to write boilerplate code.",
          "By predicting future coding requirements and preemptively generating boilerplate code."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are configuring GitHub Copilot in the CLI for a smoother developer experience. Which of the following aliases can be set up to perform common actions like code suggestions and explanations? Select 2.",
        choices: [
          "ghcs → GitHub Copilot suggest.",
          "ghce → GitHub Copilot explain.",
          "gh init → initialize Copilot CLI.",
          "share → share Copilot responses with your colleagues.",
          "gh run → run Copilot commands in a build pipeline."
        ],
        correct: [0, 1],
        multiple: true
      },
      {
        text: "Can GitHub Copilot generate entire applications?",
        choices: [
          "No, but it can assist in writing major parts of an app.",
          "Yes, it builds applications automatically.",
          "Only for Python scripts.",
          "No, it only writes single lines of code."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "When using GitHub Copilot Chat, which of the following slash commands can be used to ask for additional information or clarification about an unfamiliar function in the code?",
        choices: [
          "/explain",
          "/clarify function",
          "/debug",
          "/trace"
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are tasked with implementing GitHub Copilot in your organization for developers to generate code. Your team is concerned about the ethical implications of using AI in code generation, particularly around bias and unintended consequences in the output. What steps should you take to ensure that GitHub Copilot is used responsibly?",
        choices: [
          "Allow Copilot to generate any code automatically, assuming that the AI system has already been trained to be free of bias.",
          "Regularly review the AI-generated code for potential biases and ensure that sensitive data, such as gender, race, or age, is not being unnecessarily handled by the AI suggestions.",
          "Rely on user feedback alone to correct any issues with the AI suggestions and handle bias as it arises through manual reporting.",
          "Ensure that Copilot's suggestions are accepted without modification, as they have been optimized for efficiency and accuracy."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is responsible AI?",
        choices: [
          "AI that is always correct.",
          "AI that adheres to ethical guidelines and fairness.",
          "AI that operates without human intervention.",
          "AI that is focused only on profitability."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which principle is critical for responsible AI?",
        choices: [
          "Bias elimination.",
          "High profitability.",
          "Market dominance.",
          "Speed of computation."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Responsible AI ensures AI models are:",
        choices: [
          "Biased towards a particular group.",
          "Transparent and explainable.",
          "Hidden from users.",
          "Only used in entertainment."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which of the following is NOT a component of responsible AI?",
        choices: [
          "Fairness.",
          "Accountability.",
          "Transparency.",
          "Exclusivity."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "Responsible AI practices require:",
        choices: [
          "Ignoring privacy concerns.",
          "Continuous monitoring and updating.",
          "Keeping the model static.",
          "Reducing model accuracy for speed."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Why is fairness important in AI?",
        choices: [
          "To ensure AI is profitable.",
          "To avoid bias and discrimination.",
          "To make AI faster.",
          "To limit AI usage."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What role does transparency play in responsible AI?",
        choices: [
          "It hides the AI's decision-making process.",
          "It ensures decisions are understandable.",
          "It increases complexity.",
          "It decreases trust."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is GitHub Copilot primarily used for?",
        choices: [
          "Project management.",
          "AI-powered code completion.",
          "Bug tracking.",
          "Version control."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which IDEs support GitHub Copilot?",
        choices: [
          "Only Visual Studio Code.",
          "Visual Studio Code, Visual Studio, and JetBrains IDEs.",
          "Only IntelliJ IDEA.",
          "Only Eclipse."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How does GitHub Copilot suggest code?",
        choices: [
          "By using predefined templates.",
          "By analyzing the context of your code and using machine learning models.",
          "By searching through Stack Overflow posts.",
          "By randomly generating code snippets."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which programming languages are supported by GitHub Copilot?",
        choices: [
          "Only Python and JavaScript.",
          "Multiple languages including Python, JavaScript, and TypeScript.",
          "Only Java and C++.",
          "Only Ruby and PHP."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What feature allows GitHub Copilot to offer context-aware code suggestions?",
        choices: [
          "Static analysis.",
          "Machine learning models.",
          "Manual coding.",
          "Hard coding suggestions."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "GitHub Copilot can be used in:",
        choices: [
          "Only personal projects.",
          "Both personal and professional projects.",
          "Only open-source projects.",
          "Only closed-source projects."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How can users provide feedback on GitHub Copilot's suggestions?",
        choices: [
          "By modifying the source code.",
          "By accepting or rejecting suggestions and providing feedback.",
          "By emailing support.",
          "By ignoring the suggestions."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which subscription plans include GitHub Copilot?",
        choices: [
          "Free Plan only.",
          "Pro, Team, and Enterprise Plans.",
          "Only Enterprise Plan.",
          "Only Pro Plan."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is the primary benefit of using GitHub Copilot?",
        choices: [
          "Reducing code quality.",
          "Accelerating coding by generating code snippets.",
          "Making coding harder.",
          "Increasing debugging time."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "GitHub Copilot helps developers by:",
        choices: [
          "Writing entire projects automatically.",
          "Providing context-based code suggestions and completions.",
          "Debugging code.",
          "Managing version control."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which of the following is NOT a feature of GitHub Copilot?",
        choices: [
          "Code completion.",
          "Code review.",
          "Contextual suggestions.",
          "Documentation generation."
        ],
        correct: [1],
        multiple: false,
        warn: "⚠️ Outdated: As of 2024-2025, Copilot Enterprise DOES have code review features for PRs. Answer was correct pre-2024."
      },
      {
        text: "GitHub Copilot can generate:",
        choices: [
          "Only comments.",
          "Code snippets, comments, and documentation.",
          "Only function names.",
          "Only variable names."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "GitHub Copilot's suggestions are based on:",
        choices: [
          "A fixed set of rules.",
          "Machine learning models trained on public code.",
          "Random guesses.",
          "Users' previous projects."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Can GitHub Copilot be used for pair programming?",
        choices: [
          "Yes, it can assist in pair programming sessions.",
          "No, it is only for solo developers.",
          "Yes, but only in specific IDEs.",
          "No, it does not support collaborative coding."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is NOT required to use GitHub Copilot?",
        choices: [
          "An active GitHub account.",
          "A supported editor or IDE.",
          "A Copilot subscription.",
          "A specific operating system."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "How often does GitHub update Copilot's models?",
        choices: [
          "Weekly.",
          "Periodically, based on improvements and feedback.",
          "Monthly.",
          "Never."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "GitHub Copilot can help with:",
        choices: [
          "Writing tests.",
          "Code refactoring.",
          "Both writing tests and code refactoring.",
          "Only documentation."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "Which organization developed GitHub Copilot?",
        choices: [
          "Microsoft.",
          "OpenAI in collaboration with GitHub.",
          "Google.",
          "Facebook."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is the primary goal of GitHub Copilot?",
        choices: [
          "To replace developers.",
          "To assist developers by providing code suggestions.",
          "To manage projects.",
          "To debug code."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How can a developer disable GitHub Copilot for a specific project?",
        choices: [
          "By uninstalling the plugin.",
          "By disabling it in the project settings.",
          "By not writing any code.",
          "By deleting their GitHub account."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What should a developer do if they encounter a bug in GitHub Copilot?",
        choices: [
          "Ignore it.",
          "Report it through the feedback option in the editor.",
          "Fix it themselves.",
          "Stop using Copilot."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "GitHub Copilot can be customized by:",
        choices: [
          "Modifying its source code.",
          "Adjusting settings in the editor.",
          "Changing the machine learning model.",
          "Requesting changes from GitHub."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How does GitHub Copilot handle deprecated functions?",
        choices: [
          "It suggests using deprecated functions.",
          "It avoids suggesting deprecated functions and offers alternatives.",
          "It ignores deprecated functions.",
          "It marks them as errors."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "GitHub Copilot's code suggestions are based on:",
        choices: [
          "Publicly available code and user data.",
          "Private user data only.",
          "Random algorithms.",
          "Code snippets from paid services."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Which command can be used to accept GitHub Copilot's suggestion in Visual Studio Code?",
        choices: [
          "Tab.",
          "Ctrl + Enter.",
          "Shift + Tab.",
          "Ctrl + Shift + S."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is the shortcut to accept a Copilot suggestion in VS Code?",
        choices: [
          "Tab.",
          "Ctrl + Space.",
          "Enter.",
          "Shift + Tab."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What type of model does GitHub Copilot use?",
        choices: [
          "Decision Trees.",
          "Neural Networks.",
          "Support Vector Machines.",
          "K-Nearest Neighbors."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "GitHub Copilot's model was trained using:",
        choices: [
          "GitHub's entire private repository data.",
          "Public code repositories and other open-source projects.",
          "Data from social media.",
          "Proprietary algorithms only."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How does GitHub Copilot ensure the privacy of users' code?",
        choices: [
          "By anonymizing and aggregating data.",
          "By sharing it with third parties.",
          "By storing it in unprotected servers.",
          "By ignoring privacy concerns."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What action can users take if they do not want their code to be used for training GitHub Copilot models?",
        choices: [
          "They can opt out of data sharing.",
          "They cannot take any action.",
          "They can delete their repositories.",
          "They can stop using GitHub."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "How frequently is the data used by GitHub Copilot updated?",
        choices: [
          "Daily.",
          "Periodically, based on new public code contributions.",
          "Never.",
          "Every hour."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is the primary source of data for training GitHub Copilot?",
        choices: [
          "Proprietary datasets.",
          "Publicly available code repositories.",
          "Users' private code.",
          "Encrypted data from various sources."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "GitHub Copilot handles user data by:",
        choices: [
          "Storing it indefinitely.",
          "Using it to improve suggestions and then deleting it.",
          "Sharing it with other users.",
          "Ignoring user data."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Can users review how their data is used by GitHub Copilot?",
        choices: [
          "Yes, through GitHub's privacy policy and settings.",
          "No, it is not transparent.",
          "Only by contacting support.",
          "Only by reading code."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "GitHub Copilot's suggestions are generated by:",
        choices: [
          "Manually curated code snippets.",
          "Machine learning models analyzing the context of the code.",
          "Random text generation.",
          "Predefined templates."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How does GitHub Copilot handle sensitive information in code?",
        choices: [
          "It anonymizes and encrypts all sensitive data.",
          "It does not identify sensitive information.",
          "It automatically removes sensitive data.",
          "It stores sensitive data for future use."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is prompt engineering in the context of GitHub Copilot?",
        choices: [
          "Writing prompts for user surveys.",
          "Crafting inputs to get desired code suggestions from Copilot.",
          "Designing UI prompts.",
          "Debugging code."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Effective prompt crafting involves:",
        choices: [
          "Writing vague descriptions.",
          "Providing clear and specific instructions.",
          "Using only generic terms.",
          "Ignoring the context."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is a common practice to improve GitHub Copilot's suggestions?",
        choices: [
          "Using long and complex prompts.",
          "Using clear, concise, and context-rich prompts.",
          "Rewriting code manually.",
          "Avoiding comments."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Why is context important in prompt crafting for GitHub Copilot?",
        choices: [
          "It helps Copilot generate relevant and accurate suggestions.",
          "It makes the code longer.",
          "It confuses the AI.",
          "It is not important."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Which of the following is an example of a good prompt for GitHub Copilot?",
        choices: [
          "Write some code.",
          "Create a function that sorts an array of integers in ascending order.",
          "Do something.",
          "Generate random text."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What should be included in a prompt to get the best results from GitHub Copilot?",
        choices: [
          "Specific task description and relevant context.",
          "Only the task description.",
          "Irrelevant information.",
          "Random code snippets."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "How can a developer improve the quality of code suggestions from GitHub Copilot?",
        choices: [
          "By refining the prompt with more details and context.",
          "By using Copilot without any prompts.",
          "By ignoring Copilot's suggestions.",
          "By disabling Copilot."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Which developer task can AI, like GitHub Copilot, assist with?",
        choices: [
          "Writing documentation.",
          "Generating code snippets.",
          "Debugging code.",
          "All of the above."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "AI tools like GitHub Copilot are beneficial for:",
        choices: [
          "Reducing time spent on repetitive coding tasks.",
          "Replacing developers.",
          "Increasing coding errors.",
          "Making coding harder."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "How can AI assist in code reviews?",
        choices: [
          "By automatically accepting all code.",
          "By identifying potential issues and suggesting improvements.",
          "By ignoring the code.",
          "By replacing the reviewer."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which of the following is a use case for AI in software development?",
        choices: [
          "Code generation.",
          "Test case creation.",
          "Code refactoring.",
          "All of the above."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "AI can help developers by:",
        choices: [
          "Writing entire applications without any input.",
          "Providing suggestions and automating repetitive tasks.",
          "Ignoring user input.",
          "Increasing the workload."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is an example of AI improving developer productivity?",
        choices: [
          "Writing boilerplate code automatically.",
          "Making developers write more code.",
          "Removing all comments.",
          "Ignoring best practices."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "AI-driven code suggestions are useful for:",
        choices: [
          "Experienced developers only.",
          "Both novice and experienced developers.",
          "Only for specific languages.",
          "Non-developers."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How can GitHub Copilot assist with testing?",
        choices: [
          "By generating test cases based on code.",
          "By ignoring tests.",
          "By deleting existing tests.",
          "By writing incorrect tests."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is the benefit of using GitHub Copilot for writing tests?",
        choices: [
          "Increased test coverage.",
          "Decreased accuracy.",
          "Slower development process.",
          "Ignoring edge cases."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "GitHub Copilot can help in testing by:",
        choices: [
          "Generating boilerplate test code.",
          "Ignoring test frameworks.",
          "Removing existing tests.",
          "Adding bugs to the code."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is a key aspect of privacy when using AI tools like GitHub Copilot?",
        choices: [
          "Sharing all code with third parties.",
          "Protecting user data and ensuring it is not misused.",
          "Ignoring user privacy.",
          "Storing data indefinitely."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which company developed GitHub Copilot?",
        choices: [
          "Google.",
          "Amazon.",
          "Microsoft and OpenAI.",
          "Facebook."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "GitHub Copilot uses which AI model for code completion?",
        choices: [
          "GPT-2.",
          "Codex.",
          "Llama.",
          "Bert."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which programming languages does GitHub Copilot support?",
        choices: [
          "Only Python.",
          "Only JavaScript.",
          "Multiple programming languages.",
          "Only C++."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "How does GitHub Copilot generate code suggestions?",
        choices: [
          "It randomly generates code.",
          "It analyzes context and comments in the editor.",
          "It copies code from GitHub repositories.",
          "It asks the user for code snippets."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which IDEs officially support GitHub Copilot?",
        choices: [
          "Jupyter Notebook and RStudio.",
          "Visual Studio Code and JetBrains IDEs.",
          "Notepad++ and Eclipse.",
          "Only Sublime Text."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How can you activate GitHub Copilot in VS Code?",
        choices: [
          "Install an extension and sign in to GitHub.",
          "Run the command copilot enable.",
          "Modify the settings.json file manually.",
          "Restart VS Code 10 times."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is the primary purpose of GitHub Copilot?",
        choices: [
          "To replace software developers.",
          "To assist in writing code efficiently.",
          "To provide version control.",
          "To automate code testing."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How can you disable GitHub Copilot for a specific language?",
        choices: [
          "Remove GitHub Copilot from the marketplace.",
          "Modify the Copilot settings in VS Code.",
          "Run Copilot disable language in the terminal.",
          "It is not possible."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which subscription plans include access to GitHub Copilot?",
        choices: [
          "Free for all users.",
          "Only enterprise users.",
          "Paid subscriptions, Copilot Individual, Copilot Business.",
          "Only open-source contributors."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "Can Copilot be used for writing unit tests?",
        choices: [
          "Yes, it can generate test cases based on function signatures.",
          "No, it only writes implementation code.",
          "Only for JavaScript and Python.",
          "No, it doesn't support testing frameworks."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is the key requirement for using GitHub Copilot?",
        choices: [
          "A GitHub Pro account.",
          "A GitHub account with a Copilot subscription.",
          "A Microsoft 365 subscription.",
          "A local AI model installation."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Does GitHub Copilot work offline?",
        choices: [
          "Yes, if downloaded.",
          "No, it requires an internet connection.",
          "Only in Visual Studio.",
          "Yes, but with limited functionality."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How does GitHub Copilot handle security vulnerabilities?",
        choices: [
          "It automatically fixes all security issues.",
          "It warns users about common security risks.",
          "It does not check for vulnerabilities.",
          "It runs a security scanner on the code."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What command is used to check GitHub Copilot settings in VS Code?",
        choices: [
          "Copilot config.",
          "Ctrl + Shift + P, then search for GitHub Copilot.",
          "Copilot status.",
          "Settings > Copilot."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What type of comments improve Copilot's code suggestions?",
        choices: [
          "Clear, descriptive comments explaining the function.",
          "Random words.",
          "Empty comments.",
          "Only multi-line comments."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Can GitHub Copilot generate full classes and methods?",
        choices: [
          "Yes, based on context and comments.",
          "No, it only suggests small code snippets.",
          "Only for Python and JavaScript.",
          "Only if the user writes 50% of the code."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "How does Copilot handle proprietary or confidential code?",
        choices: [
          "It stores all code on GitHub servers.",
          "It does not store or share user code.",
          "It automatically commits code to a public repo.",
          "It suggests code from other repositories."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "How do you disable GitHub Copilot in VS Code?",
        choices: [
          "Uninstall the extension or disable it in Settings.",
          "Log out of GitHub.",
          "Use Copilot disable command.",
          "Restart VS Code 5 times."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Can GitHub Copilot assist with documentation generation?",
        choices: [
          "Yes, it can generate docstrings and comments.",
          "No, it only writes code.",
          "Only for Java projects.",
          "Only in Visual Studio."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Is Copilot available for open-source contributors for free?",
        choices: [
          "Yes, under certain conditions.",
          "No, it requires payment for all users.",
          "Only for Microsoft employees.",
          "Only for GitHub Enterprise users."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "How does Copilot learn new programming patterns?",
        choices: [
          "From publicly available code and documentation.",
          "By storing user data.",
          "By connecting to Stack Overflow.",
          "By executing AI training on a local machine."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What type of license applies to Copilot-generated code?",
        choices: [
          "Copilot does not apply a license to generated code.",
          "MIT license.",
          "Apache license.",
          "GNU General Public License."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is GitHub Copilot Chat?",
        choices: [
          "An AI-powered chat for code assistance.",
          "A messaging service for GitHub users.",
          "A feature that allows team members to communicate.",
          "A chatbot for GitHub issues."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Can Copilot help with debugging?",
        choices: [
          "Yes, it suggests fixes for common issues.",
          "No, it only writes new code.",
          "Only for JavaScript.",
          "Only in JetBrains IDEs."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "How does GitHub Copilot handle ethical coding?",
        choices: [
          "It avoids suggesting offensive or harmful code.",
          "It filters out all security vulnerabilities.",
          "It prevents all unethical uses of AI.",
          "It automatically reports bad code to GitHub."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What is the GitHub Copilot Business plan?",
        choices: [
          "A plan for teams with admin controls and policy settings.",
          "A free plan for all users.",
          "A special plan for Microsoft developers only.",
          "A private beta program."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Can Copilot auto-complete SQL queries?",
        choices: [
          "Yes, if enough context is provided.",
          "No, it only works with Python.",
          "Only with JetBrains IDEs.",
          "No, it does not support databases."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "What does GitHub Copilot use to improve AI model performance?",
        choices: [
          "Machine learning from user interactions.",
          "Manual code reviews.",
          "Direct user feedback.",
          "Internet data mining."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Can you use GitHub Copilot for mobile app development?",
        choices: [
          "Yes, for iOS and Android development.",
          "No, it does not support mobile apps.",
          "Only for Android apps.",
          "Only in Xcode."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Can you report an issue with Copilot suggestions?",
        choices: [
          "Use the Report option in the extension.",
          "Contact Microsoft Support.",
          "Disable Copilot.",
          "There is no way to report issues."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Can Copilot integrate with GitHub Actions?",
        choices: [
          "No, it does not support CI/CD.",
          "Yes, it can help write GitHub Actions workflows.",
          "Only for Python projects.",
          "Only in the GitHub Enterprise plan."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "What is the difference between Copilot and Copilot Chat?",
        choices: [
          "Copilot provides inline code suggestions; Copilot Chat offers interactive assistance.",
          "They are the same.",
          "Copilot only works for JavaScript.",
          "Copilot Chat is only available in VS Code."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Can GitHub Copilot generate entire applications?",
        choices: [
          "No, but it can assist in writing major parts of an app.",
          "Yes, it builds applications automatically.",
          "Only for Python scripts.",
          "No, it only writes single lines of code."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are working on a JavaScript project and want to generate a function that adds two numbers using GitHub Copilot. Which of the following is the most effective prompt to provide clear context and yield the desired result?",
        choices: [
          "Create a function.",
          "Write a function that calculates the sum of two numbers in Python.",
          "Sum two numbers.",
          "Write a JavaScript function named add that takes two parameters, adds them, and returns the sum."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are working on a small web application with a user model that contains the following method: class User with __init__(self, username, age) and an isAdult(self) method that returns self.age >= 18. You want to use GitHub Copilot to generate boilerplate integration tests to verify that the isAdult() method works correctly when integrated with other parts of the web application, such as a view that restricts certain content to adults. What is the best strategy to generate these integration tests using GitHub Copilot?",
        choices: [
          "Ask Copilot to generate unit tests for the isAdult() method, assuming it will be sufficient to verify the method without integration testing.",
          "Instruct Copilot to generate a test for isAdult() alone and verify its output for users over 18.",
          "Use Copilot to generate an integration test that verifies how the isAdult() method behaves within a complete workflow, such as attempting to access restricted content based on the user's age.",
          "Instruct Copilot to focus only on testing the function without considering how it interacts with other system components."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are a software engineer using GitHub Copilot to help generate code for a new data processing feature. The project requires handling sensitive user data, including personally identifiable information (PII). Copilot suggests a code snippet that performs data validation, but you are unsure about its handling of sensitive data. What is the most responsible action you should take to ensure compliance with ethical AI usage and data privacy regulations?",
        choices: [
          "Analyze the code generated by Copilot to ensure that it follows best practices for handling PII, such as data encryption and anonymization, before implementing it.",
          "Test the code for security flaws using an automated tool, without reviewing it manually, since automated tools can detect any issues related to sensitive data.",
          "Assume that since Copilot suggested the code, it has already undergone internal review for regulatory compliance, and you can focus on other project areas.",
          "Immediately implement the Copilot-suggested code snippet, as AI models are designed to follow best practices."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are tasked with implementing GitHub Copilot in your organization for developers to generate code. Your team is concerned about the ethical implications of using AI in code generation, particularly around bias and unintended consequences in the output. What steps should you take to ensure that GitHub Copilot is used responsibly?",
        choices: [
          "Allow Copilot to generate any code automatically, assuming that the AI system has already been trained to be free of bias.",
          "Regularly review the AI-generated code for potential biases and ensure that sensitive data, such as gender, race, or age, is not being unnecessarily handled by the AI suggestions.",
          "Rely on user feedback alone to correct any issues with the AI's suggestions and handle bias as it arises through manual reporting.",
          "Ensure that Copilot's suggestions are accepted without modification, as they have been optimized for efficiency and accuracy."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are using GitHub Copilot to help with a mathematical algorithm that requires precise calculations. While Copilot is excellent at generating code snippets, you're curious about its ability to provide reasoning and perform precise calculations. Which of the following best describes GitHub Copilot's capabilities and limitations in this scenario?",
        choices: [
          "GitHub Copilot can perform complex calculations accurately by leveraging its deep learning model, which is optimized for mathematical computations.",
          "GitHub Copilot can process and reason through mathematical proofs, ensuring that the code generated is logically sound and mathematically correct.",
          "GitHub Copilot can generate code for calculations, but it relies on the logic you provide in the prompt and does not inherently understand or guarantee the accuracy of the calculations.",
          "GitHub Copilot is specifically designed to handle mathematical reasoning and calculations and can replace tools like Wolfram Alpha or scientific calculators."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are the lead engineer at a software development company and have been tasked with evaluating GitHub Copilot's data handling policies before it can be used across the team. Some team members are concerned about the safety of proprietary code and whether GitHub Copilot shares private data with other users or trains its AI model using private repository data. You need to clarify how GitHub Copilot handles data to address these concerns. Which of the following statements accurately describe how GitHub Copilot handles user data and code snippets? Select 2.",
        choices: [
          "GitHub Copilot sends detailed telemetry data, including code suggestions, back to GitHub for auditing and analysis.",
          "GitHub Copilot generates real-time code suggestions without storing the actual code snippets provided by users.",
          "Code snippets generated by GitHub Copilot are stored on GitHub servers for up to 30 days to improve its training model.",
          "GitHub Copilot uses data from public and private repositories to improve its model over time.",
          "GitHub Copilot's AI model is primarily trained on public data and open-source repositories, not private user data."
        ],
        correct: [1,4],
        multiple: true
      },
      {
        text: "You are using GitHub Copilot in your IDE to assist with code generation for a large software project. You are interested in understanding how the GitHub Copilot data pipeline works from the moment you start typing code until the moment a suggestion is made. Which of the following accurately describes the data pipeline lifecycle of GitHub Copilot's code suggestions in an IDE?",
        choices: [
          "When you type, Copilot uses a pre-trained model that only processes your input locally on your machine, without sending data to the cloud.",
          "Copilot accesses your local code, sends the data to the cloud, processes it, and trains the model in real time using your inputs.",
          "As you type, Copilot sends the code context to the cloud-based model, which processes the input using pre-trained data and returns suggestions, without using your specific inputs for future model training.",
          "The entire Copilot model runs locally on your machine, and no data is transmitted over the network, ensuring that all code suggestions are generated offline."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are optimizing a function in your codebase that processes large arrays of user-provided data. You want to enhance its performance while ensuring security best practices, such as input validation and buffer overflow protection. GitHub Copilot provides several suggestions for improving the performance of this function. Which of the following suggestions provided by GitHub Copilot is the most appropriate for optimizing performance while ensuring the code is secure?",
        choices: [
          "Suggesting the use of caching for previously processed results.",
          "Suggesting input sanitization using a regular expression, without handling edge cases.",
          "Suggesting an optimization that removes input validation for faster execution.",
          "Replacing the function with a recursive solution to reduce the number of loops."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are working on a new feature in a private repository and want to understand how GitHub Copilot suggests code based on the data it has access to. You are concerned about whether your private repository's code is being used to train the model and whether your suggestions are coming from the open-source codebase. Which of the following statements accurately describes how GitHub Copilot works in terms of handling data to generate code suggestions?",
        choices: [
          "GitHub Copilot sends all code from your local environment to GitHub's servers, including private repository code, for model refinement.",
          "Copilot's code suggestions are based only on public code repositories, and it does not use any private code to improve its general model.",
          "Copilot uses code from your private repositories to train its underlying model so that it can make better suggestions tailored to your project.",
          "GitHub Copilot generates suggestions based on both public code repositories and your local environment, such as the open files in your IDE, but does not use your private code to retrain the model."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are using GitHub Copilot to generate code snippets for a machine learning project. You want Copilot to generate a function that trains a neural network using PyTorch. To guide Copilot to provide a more accurate solution, you're deciding whether to use zero-shot or few-shot prompting. You've previously written a similar function and want to give Copilot a few examples to help it generate a better response. Which of the following is the best way to frame your prompt to GitHub Copilot for few-shot prompting?",
        choices: [
          "Train a neural network using PyTorch.",
          "Write a PyTorch function to train a neural network. Here's an example of how to load data and define the network architecture.",
          "I want a function that uses PyTorch to train a neural network.",
          "Write code for a PyTorch neural network. I'll provide examples later."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are developing an AI-based recruiting system and are using GitHub Copilot to help write code that filters job applicants based on their qualifications. Given that Copilot's training data might contain historical biases, e.g., gender, race, how can you ensure that the code it generates does not inadvertently introduce bias into the system?",
        choices: [
          "Assume that bias testing is unnecessary because Copilot is neutral.",
          "Ask Copilot to specifically avoid gender, race, and age attributes in its suggestions.",
          "Conduct thorough bias testing on the Copilot-generated code to ensure the system does not discriminate.",
          "Rely on Copilot's training set and trust its suggestions."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are part of a team working on a highly sensitive and proprietary software project. The team is considering using GitHub Copilot to accelerate development, but there are concerns about the tool's limitations, especially regarding collaboration and proprietary code. What are some key limitations of GitHub Copilot that you should be aware of in this scenario? Select 2.",
        choices: [
          "Copilot can autonomously handle sensitive data in code, ensuring it won't expose confidential info.",
          "Copilot can generate highly specific suggestions based on proprietary algorithms without prior training on the project.",
          "Copilot may suggest code similar to publicly available code, raising IP concerns.",
          "Copilot guarantees generated code is safe for proprietary projects.",
          "Copilot is not designed to understand the entire context of a project, which can lead to inconsistent suggestions."
        ],
        correct: [2,4],
        multiple: true
      },
      {
        text: "You are working on a large project and notice that GitHub Copilot's suggestions sometimes seem irrelevant to the code you are working on, especially when dealing with files with many lines of code. You want to understand why this is happening and how GitHub Copilot handles large files. Which of the following statements best describes the limitations of GitHub Copilot in relation to limited context windows?",
        choices: [
          "Copilot can analyze and understand the entire project, no matter how large the files are.",
          "Copilot has no issues with context windows, it continuously learns from the entire codebase.",
          "Copilot can only take into account a limited number of lines of code around the cursor due to the limited context window.",
          "Copilot processes all lines of code in a file but prioritizes recent changes near the cursor."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are an IT administrator at a large enterprise that uses GitHub Copilot Business. Your organization needs to automate the management of its GitHub Copilot Business subscriptions using GitHub's REST API. You've been asked to integrate a process that allows your team to list all active Copilot subscriptions and assign licenses to users programmatically. Which API endpoint and method should you use to retrieve the list of active Copilot subscriptions, and what permissions are required for successful API calls?",
        choices: [
          "Use the get/org/org/copilot/licenses endpoint: the API token needs admin org scope.",
          "Use the get/users/username/copilot/licenses endpoint: the API token needs read org scope.",
          "Use the POST/org/org/Copilot/AssignLicense endpoint, the API token needs write/org scope.",
          "Use the GET/org/org/Copilot/Subscriptions endpoint, the API token needs admin/org scope."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are using GitHub Copilot for a project, and you begin to wonder how Copilot generates suggestions based on your inputs and ensures that personal or sensitive data is not shared. Your company is concerned about compliance and data privacy, so you are tasked with explaining how Copilot handles your data and what safeguards are in place. Which of the following best explains how GitHub Copilot handles user inputs and ensures data privacy during the suggestion process?",
        choices: [
          "GitHub Copilot continuously sends user inputs to the cloud, where they are stored and analyzed for future improvement of the machine learning model.",
          "GitHub Copilot sends user inputs, including private code, directly to the cloud-based model, which uses all available data for generating suggestions.",
          "GitHub Copilot processes user inputs locally on the developer's machine and does not send any data to external servers.",
          "GitHub Copilot sends user inputs to a proxy service that anonymizes the data and filters out any sensitive information before sending it to the cloud-based model for code suggestions."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are building a web application with GitHub Copilot and need to write a function to handle user authentication, ensuring it is secure. You notice that when you give a simple prompt like 'Write an authentication function', Copilot generates a solution that uses outdated practices, such as storing plain-text passwords. You realize you need to refine your prompt to ensure Copilot suggests secure, up-to-date practices. Which of the following would be the best prompt to help GitHub Copilot generate a secure authentication function?",
        choices: [
          "Create an authentication function for user login.",
          "Generate an authentication function using bcrypt for hashing passwords and jwt for session management.",
          "Write a function that hashes passwords for authentication.",
          "Write a secure authentication function that uses SHA-1 to hash passwords."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are working on a project and using GitHub Copilot's chat functionality for help with debugging. Your manager asks you to explain the data flow between your machine, GitHub Copilot, and OpenAI's servers when you use the chat feature. Additionally, they are concerned about whether the information exchanged during these interactions is stored and reused in future chats. Which of the following best describes the data flow when using GitHub Copilot's chat functionality?",
        choices: [
          "Chat interactions are stored permanently on GitHub's servers for future model improvement, but no data is shared with third parties.",
          "All chat interactions are processed locally, and no data is sent to any external server.",
          "Chat interactions are sent to GitHub's servers, which then forward them to OpenAI for processing, with some chat data being stored to improve responses in future sessions.",
          "GitHub Copilot's chat feature sends input directly to OpenAI's Codex API for processing, and no input is stored permanently by GitHub or OpenAI."
        ],
        correct: [2],
        multiple: false,
        warn: "⚠️ Outdated: Now uses Azure OpenAI (not direct OpenAI). Business/Enterprise data is NOT stored for model improvement."
      },
      {
        text: "You are working on a Python project that includes a function calculate_discount, which calculates the final price after applying a discount. You want to use GitHub Copilot to generate unit tests for this function, ensuring that edge cases like invalid input are also covered. How can you use GitHub Copilot to generate appropriate tests for your function? Select 2.",
        choices: [
          "Generate only positive test cases and write negative cases manually.",
          "Provide comments describing edge cases and let Copilot generate tests based on them.",
          "Prompt Copilot with the function signature and ask it to generate tests.",
          "Rely entirely on Copilot to generate tests and assume they cover all edge cases.",
          "Ask Copilot to generate tests without including any function or code context."
        ],
        correct: [1,2],
        multiple: true
      },
      {
        text: "You are working on a government-related software project that deals with confidential citizen data. You've configured a .copilotignore file to exclude sensitive files from GitHub Copilot's context. However, your team is concerned about the limitations of content exclusions. Which of the following statements best describes a limitation of content exclusions in GitHub Copilot?",
        choices: [
          "Once files are excluded, Copilot stops making suggestions for the entire project.",
          "Content exclusions also prevent suggestions based on general programming patterns that resemble the excluded files.",
          "Content exclusions will not prevent Copilot from using sensitive code that was processed before adding files to .copilotignore.",
          "After excluding files, Copilot will only offer suggestions for code related to open-source projects."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are working as a software engineer in a company that is evaluating GitHub Copilot's plans to integrate into your development workflow. The team wants to understand the different features and plan types offered by GitHub Copilot before making a decision. As the team lead, it's your responsibility to explain the available features and plans. Which of the following statements accurately describes the features of GitHub Copilot across its available plans?",
        choices: [
          "Copilot is free for all users, with no paid plans.",
          "Copilot for Business includes access to advanced AI models, usage controls, and additional security features compared to individual plans.",
          "Copilot requires continuous internet and does not work offline regardless of plan.",
          "Copilot is available only for individuals and not organizations."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You've been using GitHub Copilot Chat to help with writing code, but now you want to use it for more advanced tasks, like debugging and code optimization. Your goal is to leverage Copilot Chat's features to improve your code and fix potential issues efficiently. Which of the following are tasks that GitHub Copilot Chat can assist you with? Select 3.",
        choices: [
          "Managing version control and automatically creating pull requests.",
          "Providing static analysis reports on code security vulnerabilities.",
          "Explaining why certain code produces errors and offering potential fixes.",
          "Suggesting performance optimizations based on the code context.",
          "Identifying redundant code and suggesting refactoring opportunities."
        ],
        correct: [2,3,4],
        multiple: true
      },
      {
        text: "Your company, Tech Innovate Solutions, is considering upgrading from GitHub Copilot for Individuals to GitHub Copilot Enterprise. The goal is to ensure that all developers across the organization benefit from increased collaboration and productivity while maintaining robust security and compliance standards. As the DevOps lead, you are tasked with choosing the correct GitHub Copilot plan based on its features. Which feature is specific to GitHub Copilot Enterprise and would be most beneficial to Tech Innovate Solutions, considering its need for secure, large-scale collaboration?",
        choices: [
          "Access to experimental Copilot Labs features.",
          "IDE integration for suggestions in editors.",
          "Centralized administrative controls and security features like SSO and audit logging.",
          "Personalized suggestions tailored to each developer's local environment."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are building a predictive model to classify customer behavior based on transactional data. Your dataset includes raw transactional details, such as amounts, timestamps, and customer IDs, but no features that directly help with classification. You want to perform feature engineering to create new, meaningful features from the raw data. Your team is using GitHub Copilot to accelerate this process. Which of the following best demonstrates how GitHub Copilot can be used effectively for feature engineering in this scenario?",
        choices: [
          "Use Copilot to generate code for basic feature transformations, reviewing its suggestions.",
          "Allow Copilot to automatically create and select all relevant features without intervention.",
          "Avoid using Copilot for feature engineering entirely.",
          "Rely on Copilot to identify the best features and use them directly."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Your organization is considering creating a knowledge base to enhance code quality and consistency with the help of GitHub Copilot Enterprise. You are tasked with determining how to effectively leverage the knowledge base for code completion and review purposes. Which of the following best describes how the Knowledge Base works in GitHub Copilot Enterprise?",
        choices: [
          "It is a shared library used to train the Copilot model in real time.",
          "It stores coding standards, templates, and snippets that Copilot will prioritize when offering suggestions.",
          "It automatically converts documentation into new training data for the organization-wide model.",
          "It provides real-time debugging suggestions based on past incidents."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "A developer wants to exclude all files within a specific directory from GitHub Copilot's suggestions. Which syntax would they use in the .copilotignore file to achieve this?",
        choices: [
          "Copilot off directory",
          "#exclude directory",
          "directory",
          "ignore dirhtiru"
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are a software developer tasked with building a new feature for an e-commerce platform that involves calculating the total price of items in a shopping cart, including tax and discounts. You are using JavaScript for the project. You're on a tight deadline and need to quickly implement this logic. You decide to use GitHub Copilot to assist in generating the initial code. Which of the following statements best describes how GitHub Copilot can help you in this scenario?",
        choices: [
          "Provide code snippets for basic operations like totals, tax and discounts.",
          "Write complete logic for all tax laws without developer input.",
          "Replace manual testing entirely by generating perfect tests.",
          "Guarantee optimized logic for large-scale e-commerce."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are a developer who frequently works from the command line. You want to install GitHub Copilot in the CLI to leverage its auto-completion capabilities while working on various projects. What are the correct steps to install GitHub Copilot in the CLI?",
        choices: [
          "Use Homebrew to install Copilot and authenticate.",
          "Clone the Copilot repo and run make install.",
          "Install Copilot CLI via npm, run the Copilot setup, and authenticate with a personal access token.",
          "Install via pip and run Copilot CLI configure."
        ],
        correct: [2],
        multiple: false,
        warn: "⚠️ Debatable: Correct install is actually 'gh extension install github/gh-copilot'. None of these choices match official docs. See Q in Part 2 for correct answer."
      },
      {
        text: "You are a software developer working on a large codebase. Your company has implemented GitHub Copilot to help developers be more productive by providing AI-based code suggestions. You're currently working on a new feature in an existing project, and you need to implement a complex function. Copilot suggests a code block that appears to do what you need, but it is unfamiliar to you. Which of the following is the best practice for using Copilot in this scenario to ensure both productivity and code quality?",
        choices: [
          "Use it as a placeholder and refactor later after feature completion.",
          "Assume suggestions are optimized and secure, minimal review needed.",
          "Manually review the suggested code to understand its logic before integrating.",
          "Accept suggestion without review."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are a developer who is concerned about how GitHub Copilot processes and stores your data, especially when you are working on sensitive projects. Your company handles confidential data, and you want to ensure that no private code or data is being shared or stored in ways that could compromise security. Which statement best describes how GitHub Copilot handles user data, including your code and suggestions?",
        choices: [
          "Temporarily logs user code inputs and suggestions to improve model performance, but deletes them after a short period.",
          "Does not store any user code inputs or suggestions at all.",
          "Encrypts and stores all code inputs to personalize suggestions.",
          "Stores all code suggestions permanently on GitHub servers."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Your organization is evaluating GitHub Copilot as a productivity tool to assist developers in their daily work. However, none of your developers use GitHub for version control, and you would like to know what features and limitations exist for non-GitHub customers using Copilot. Your team is also interested in whether different subscription tiers offer distinct features. Which of the following is true about GitHub Copilot's features for non-GitHub customers?",
        choices: [
          "Non-GitHub customers cannot access suggestions for frameworks in GitHub-hosted projects.",
          "Non-GitHub customers have access to basic features, but enterprise-level controls are available only to GitHub Enterprise users.",
          "Non-GitHub customers get all features including team collaboration without signing up for GitHub.",
          "Copilot offers identical functionality to all users regardless of subscription."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are developing a customer-facing web application and store sensitive user data, such as Personally Identifiable Information (PII), in your codebase. To prevent exposing this sensitive data through GitHub Copilot's suggestions, you want to ensure that you properly handle data privacy by excluding certain files, such as configuration files containing sensitive keys or credentials, from Copilot's training data. Which of the following strategies is the most effective in ensuring that sensitive data in your codebase is not used in GitHub Copilot's suggestions or training data?",
        choices: [
          "Include .env files in .gitignore to prevent tracking.",
          "Write comments marking sensitive sections so Copilot ignores them.",
          "Rename sensitive files to less obvious names.",
          "Use Copilot settings to block specific repositories from contributing to training data."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "GitHub Copilot often generates code based on natural language prompts. Which of the following best describes how GitHub Copilot interprets a prompt to generate code rather than perform a calculation?",
        choices: [
          "Uses mathematical optimization to calculate the most efficient solution.",
          "Parses commands and converts them directly into predefined code snippets stored in a repository.",
          "Leverages pre-trained language models that interpret prompts using patterns and examples in training data.",
          "Uses real-time data analysis to calculate code outputs from formulas."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are collaborating with a team on a project that involves creating API endpoints in Node.js using Express. You want to ensure that GitHub Copilot generates accurate responses to your prompts by following a systematic prompt process flow. During your first attempt to prompt Copilot, you simply wrote, 'Write an express route to handle POST requests.' The solution provided was functional but didn't include error handling or validation of the incoming data. Which of the following approaches best follows the prompt process flow to refine your prompt and get an improved suggestion from GitHub Copilot?",
        choices: [
          "Write an Express Route to handle POST requests, ensuring data is valid and errors are caught.",
          "Write an Express Route to handle POST requests with error handling.",
          "Write an Express POST route with validation and error checking.",
          "Write an Express Route in Node.js to handle POST requests, validating input data and including error handling."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are working on a project to build a loan approval system for a bank using GitHub Copilot to speed up development. The system will be used to make important financial decisions, and your company is focused on ensuring responsible AI usage. What steps should you take to ensure transparency and accountability when using Copilot for this project?",
        choices: [
          "Allow Copilot to suggest code but ensure all suggestions are logged and reviewed during code audits.",
          "Document every decision Copilot makes and flag any code related to sensitive areas.",
          "Assume Copilot-generated code is compliant and skip additional logging.",
          "Rely on Copilot's suggestions without documenting usage."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "A software development team wants to assess the productivity impact of using GitHub Copilot in their daily workflow. They have been using GitHub Copilot for a few weeks and now want to use GitHub's Productivity API to track metrics related to Copilot's influence on coding activities. They are particularly interested in understanding the percentage of code suggestions accepted by developers and the time saved by using Copilot. Which of the following is the correct approach to use the GitHub Productivity API for tracking Copilot's impact on developer productivity?",
        choices: [
          "Add an entry for files in VS Code settings.json.",
          "Create a Copilot.json file listing ignored directories.",
          "Rely solely on GitHub activity logs without the Productivity API.",
          "Track pull requests and use Productivity API to infer Copilot's impact based on commit frequency changes."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "Which feature in GitHub Copilot Business is designed to enhance code security within organizational projects?",
        choices: [
          "Enable admins to configure whether Copilot suggestions retain telemetry data for security insights.",
          "Limit suggestions to public repositories only.",
          "Enforce suggestions exclusively based on internal org repositories.",
          "Restrict Copilot access to approved IDEs only."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are working on a confidential project for a client that involves sensitive information, such as personally identifiable information (PII). To help speed up development, you are considering using GitHub Copilot to assist with generating code. However, you are concerned about privacy and the potential for Copilot to inadvertently access or expose confidential data while providing suggestions. Which of the following actions would be the most effective way to protect sensitive information while using GitHub Copilot for development?",
        choices: [
          "Enable Copilot's data privacy settings to exclude files with sensitive content from training models.",
          "Train Copilot on your private repo to adapt suggestions.",
          "Remove Copilot entirely from the project repository.",
          "Use inline comments to notify Copilot when sensitive information appears."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are a team lead in a software development company that has recently adopted GitHub Copilot. You've heard about GitHub Copilot Chat, which adds an interactive chat feature to Copilot, and you want to present its main features to your team. Which of the following are key features of GitHub Copilot Chat?",
        choices: [
          "Provides step-by-step explanations for suggested code snippets.",
          "Collaborates in real-time with other developers on the same project.",
          "Automatically refactors entire codebases upon request.",
          "Generates detailed test cases based on user prompts."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are working in an enterprise environment where data privacy is a top priority. Your team is using GitHub Copilot to generate code suggestions within your IDE, and management is concerned about how Copilot handles sensitive data, such as proprietary algorithms and API keys. You are asked to explain how GitHub Copilot processes and manages your input to ensure compliance with privacy policies. Which of the following statements best describes how GitHub Copilot processes your code and manages sensitive data like API keys or proprietary code?",
        choices: [
          "Copilot automatically detects and prevents sensitive data from being processed or suggested.",
          "Copilot sends your code input to remote servers, where sensitive data is filtered, and none of the input is stored after generating suggestions.",
          "Copilot sends all user input to remote servers and stores it for future training.",
          "Copilot processes input locally and never sends data externally."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are leading a team of developers who frequently engage in code reviews. As the team grows, the code review process has become time-consuming and often bottlenecks the deployment pipeline. You want to use GitHub Copilot to help streamline the process by automating parts of it. Which of the following would be the most effective way to use GitHub Copilot in improving developer productivity during code reviews?",
        choices: [
          "Automatically accept all changes suggested by developers.",
          "Let Copilot detect and automatically fix bugs without oversight.",
          "Use Copilot to identify only stylistic issues and nothing else.",
          "Use Copilot to propose potential code improvements that reviewers can evaluate."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are developing a web application using a combination of HTML, JavaScript, and Python. While working on your Python backend, you switch to JavaScript to write a function for updating the frontend in real-time. However, you notice that Copilot's JavaScript suggestions seem to be based on your recent Python code rather than the JavaScript functions in the current file. This confuses you, and you want to understand how Copilot determines the correct context when switching languages. What should you do to ensure that Copilot generates relevant JavaScript suggestions based on the current file's context?",
        choices: [
          "Rely on Copilot's built-in ability to switch between languages.",
          "Open a new project to prevent confusion between languages.",
          "Close the previous language file before starting a new one.",
          "Ensure your prompt and surrounding JavaScript code are specific and relevant to the JavaScript task."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "What is a key consideration when relying on GitHub Copilot Chat's explanations of code functionality and proposed improvements?",
        choices: [
          "Explanations are dynamically updated based on user feedback.",
          "Always review and validate generated output for accuracy and completeness.",
          "Copilot Chat uses a static database for explanations.",
          "Explanations are derived primarily from user documentation."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are using GitHub Copilot Chat while developing a new feature for your company's web application. The tool provides several code suggestions for you to consider. What options do you have when using GitHub Copilot Chat's code suggestions?",
        choices: [
          "You must accept suggestions exactly as presented with no edits.",
          "Suggestions can be automatically committed without review.",
          "You can directly accept, modify, or reject the code suggestions provided by Copilot Chat.",
          "You can only accept suggestions if they pass static analysis automatically."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are working on a full-stack web development project. You need GitHub Copilot to help generate both front-end (HTML, CSS, and JavaScript) and back-end (Python, Node.js) code. To ensure you get high-quality suggestions, you're wondering what languages and contexts GitHub Copilot supports. Which of the following statements best describes how GitHub Copilot supports different languages and technologies when writing prompts?",
        choices: [
          "Copilot can only suggest code in the language currently used in the file.",
          "Copilot only works for popular languages like Python and JavaScript.",
          "Copilot supports multiple languages and contexts and can generate full-stack code.",
          "Copilot does not support markup languages like HTML or CSS."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You're a developer wondering how GitHub Copilot processes the input, your code prompt, and provides suggestions in your IDE. Specifically, you're curious about how the data pipeline works, including any pre-processing and post-processing that occurs when you use the tool. Which of the following best describes the data pipeline lifecycle of GitHub Copilot when generating code suggestions based on user input?",
        choices: [
          "It sends prompts directly to the model without any filtering or processing.",
          "Prompts pass through a proxy that only handles authentication.",
          "Prompts are directly fed into the model which returns suggestions without filtering.",
          "Prompts are filtered for personal data, sent to the model, and filtered again to prevent harmful or insecure suggestions."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are developing a Node.js web application with an authentication feature. Security is a critical concern, and you want to ensure that potential vulnerabilities like SQL injection and cross-site scripting are adequately tested. You plan to use GitHub Copilot to improve your security testing strategy. What approach should you take to leverage GitHub Copilot for improving your security tests?",
        choices: [
          "Generate tests that only check valid authentication flows.",
          "Refactor the SQL query for performance and assume security improves.",
          "Generate security-focused test cases by writing comments indicating potential security issues like SQL injection and XSS.",
          "Generate generic functional tests and assume they will catch security issues."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are using GitHub Copilot to generate a function that finds the maximum value in an array of numbers in Python. Which of the following prompt formats is most likely to generate the correct and efficient code?",
        choices: [
          "Create a Python function to find the maximum value in a list of numbers.",
          "Find maximum value.",
          "Create a function that finds the average of numbers.",
          "Make a function to compare things in Python."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "A developer is using GitHub Copilot Chat to improve their productivity. Which of the following features will allow them to receive explanations for code and suggestions directly in their editor as they work on a project?",
        choices: [
          "Syntax highlighting for improved readability.",
          "Code explanations that help understand complex segments in natural language.",
          "In-line suggestions for completing lines of code.",
          "Real-time collaboration for multiple users editing the same file."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Your team is considering adopting GitHub Copilot for an enterprise project to accelerate development. As the team's tech lead, you need to assess the features of GitHub Copilot and choose the correct plan that suits your team's requirements. Your team requires a solution that integrates with Visual Studio Code, supports multi-line code completions, and provides security vulnerability detection features. Which GitHub Copilot plan would you recommend to your team?",
        choices: [
          "GitHub Copilot Free Plan",
          "GitHub Copilot Individual Plan",
          "GitHub Copilot Business Plan",
          "GitHub Copilot Basic"
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are using GitHub Copilot to write code for a machine learning pipeline in Python. While Copilot can suggest basic functions and code snippets, you find that it often fails to understand the broader logic and business rules that are crucial to your project. You are aware that Copilot is based on a Large Language Model (LLM), and you begin to consider the inherent limitations of such models when it comes to producing context-aware suggestions for complex projects. Which of the following statements accurately describes the limitations of GitHub Copilot and large language models in general?",
        choices: [
          "Copilot has access to the latest information on all libraries and frameworks.",
          "Copilot's suggestions are often based on syntactic patterns rather than deep semantic understanding.",
          "Copilot can understand project requirements perfectly with detailed comments.",
          "Large language models can create solutions for any problem regardless of complexity."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are working on a Python project and are unsure how to properly handle an exception when a file fails to open. You decide to use GitHub Copilot to assist with generating appropriate exception handling code. What is the best way to trigger GitHub Copilot to help you in this situation?",
        choices: [
          "Start typing the beginning of a try-except block and let Copilot suggest code.",
          "Use Copilot CLI to find an example from the command line.",
          "Paste full code into Copilot Chat and ask for error resolution.",
          "Invoke inline chat to ask about exception handling."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Which GitHub Copilot plan allows for prompt and suggestion collection?",
        choices: [
          "GitHub Copilot Individuals",
          "GitHub Copilot Business",
          "GitHub Copilot Enterprise",
          "GitHub Copilot Code Space"
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are working on a function to process customer orders. You need to create a function in Python that calculates the total cost including taxes and discounts. You decide to use GitHub Copilot to assist with generating the function. To ensure Copilot provides a high-quality suggestion, you write the following prompt: '# function to calculate total cost of order including taxes and discounts'. However, the generated code misses the discount logic entirely. Which of the following strategies would most likely improve the quality of GitHub Copilot suggestions in this scenario?",
        choices: [
          "Add multiple examples of test cases within the prompt.",
          "Add more specific details to the prompt such as 'function to calculate total cost of order with 10% tax and 5% discount'.",
          "Reduce the complexity of the prompt to 'function to calculate order cost'.",
          "Use a prompt that specifies the language syntax like 'Python function to calculate total order cost including taxes and discounts'."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Which of the following slash commands is available in GitHub Copilot Chat to quickly provide context-aware suggestions for the currently edited code?",
        choices: [
          "/suggest code",
          "/optimize",
          "/generate docs",
          "/explain"
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are developing a medical records management system that involves sensitive health data. As you integrate GitHub Copilot into your workflow, you want to ensure that none of the personally identifiable information (PII) or sensitive health records in your codebase are exposed during the code generation process. You are aware that GitHub Copilot processes the code and comments as part of the context to generate suggestions, and you need to exclude any such data from this context. Which of the following steps is the most effective way to ensure that sensitive data is excluded from Copilot's context during code generation?",
        choices: [
          "Anonymize all sensitive data within the code before using Copilot.",
          "Disable GitHub Copilot for specific files or repositories containing sensitive data.",
          "Encrypt sensitive data in your files so Copilot cannot process it.",
          "Disable GitHub Copilot for certain functions and enable it only when needed."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are the administrator of a GitHub repository for a private project. This project involves sensitive user data including personal details and payment information. Your goal is to ensure that GitHub Copilot does not access or use sensitive content for suggestions or completions. As part of maintaining compliance with privacy standards like GDPR, you want to configure the repository to exclude sensitive data and prevent accidental exposure. Which of the following actions would effectively exclude sensitive content from being accessed by GitHub Copilot within this repository?",
        choices: [
          "Set the repository to private as private repositories are automatically excluded from GitHub Copilot suggestions.",
          "Enable Copilot exclusion rules in the repository settings specifying the files and directories containing sensitive information.",
          "Remove the sensitive files from the repository's .gitignore file.",
          "Add a comment block to sensitive files that includes the line # copilot Ignore."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "A junior developer in your team is using GitHub Copilot for autogenerating code. The developer raises concerns about potential copyright violations and security risks in the AI-generated code. What actions should your team take to mitigate these potential harms?",
        choices: [
          "Rely entirely on GitHub Copilot's built-in filtering mechanisms to avoid generating insecure or copyrighted code.",
          "Train developers to carefully review AI-generated code for security vulnerabilities, licenses and ensure compliance with internal policies before using it in production.",
          "Immediately stop using GitHub Copilot as it is impossible to ensure compliance with copyright and security requirements in AI-generated code.",
          "Only allow senior developers to use Copilot since they are more likely to identify potential harms related to copyright and security."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are a software developer working on a large-scale private project for a healthcare company. The project contains a mixture of proprietary code and patient data files that must remain private to comply with HIPAA regulations. Your team uses GitHub Copilot to assist with code generation but wants to ensure that no patient data or proprietary algorithms are inadvertently accessed by Copilot. Which of the following is the most appropriate way to configure GitHub Copilot to exclude sensitive content in this scenario?",
        choices: [
          "Enable repository-level exclusion rules for files and directories that contain proprietary code or patient data.",
          "Disable GitHub Copilot for the entire repository to prevent any access to sensitive data.",
          "Set the repository to private to automatically exclude it from GitHub Copilot's access.",
          "Add all files containing sensitive data to the .gitignore file to prevent GitHub Copilot from accessing them."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are a software developer at a financial institution and you're using GitHub Copilot to assist in writing a program that handles sensitive user data such as social security numbers (SSNs), bank account information, and transaction histories. Your team is concerned about responsible AI usage and the potential ethical and legal ramifications of relying on AI-generated code. Which of the following actions demonstrates responsible usage of GitHub Copilot in this scenario?",
        choices: [
          "Using Copilot to generate code that handles sensitive data directly without reviewing it as Copilot is trained on public codebases and assumed to be reliable.",
          "Relying entirely on Copilot for implementing encryption algorithms for sensitive data handling as Copilot is built on a large codebase and can suggest the most optimized algorithms.",
          "Allowing Copilot to suggest code for all areas of the project including sensitive data handling without consulting your organization's legal or compliance teams.",
          "Using Copilot to generate code but reviewing all AI-generated code, especially sections dealing with sensitive data handling and encryption, before using it in production."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "Which of the following features is exclusive to GitHub Copilot Business and not available in GitHub Copilot for individual users?",
        choices: [
          "Integration with cloud-based IDEs like GitHub Codespaces for remote development.",
          "Ability to generate code suggestions across various programming languages and IDEs.",
          "Centralized administrative controls for managing user access and license allocation within an organization.",
          "Real-time context-aware code suggestions based on surrounding code and comments."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are a project manager for a small software development team. Your team uses GitHub for version control and you're considering GitHub Copilot to boost productivity and assist with coding. You're reviewing different GitHub Copilot plans to determine which is best for your team. You want to understand what features are available in each plan to make an informed decision. Which of the following statements about GitHub Copilot's available plans and features is correct?",
        choices: [
          "GitHub Copilot is available for individual developers as well as organizations with differences in pricing and feature sets.",
          "GitHub Copilot does not provide code completion for non-GitHub repositories.",
          "GitHub Copilot is only available as a paid product and does not have any free plan or trial option.",
          "GitHub Copilot is only available for use in Visual Studio Code and no other IDEs are supported."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "Which Microsoft ethical AI principle is aimed at ensuring AI systems treat all people equally?",
        choices: [
          "Privacy and security",
          "Fairness",
          "Reliability and safety",
          "Inclusiveness"
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are training an AI model like GitHub Copilot to assist in generating SQL queries. The goal is to train the model to understand how to efficiently retrieve customer data considering best practices for indexing and query performance. Which of the following training methods would be most appropriate to achieve this goal?",
        choices: [
          "Transfer learning using a pre-trained language model that specializes in conversational AI.",
          "Unsupervised learning to find patterns in SQL queries and data retrieval methods.",
          "Reinforcement learning by having the model try random SQL queries and get rewards for successful executions.",
          "Supervised learning using a dataset of correctly structured SQL queries and corresponding data models."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "An enterprise is implementing GitHub Copilot with a custom model to improve productivity. Which of the following is a realistic benefit of this setup in an enterprise environment?",
        choices: [
          "Custom models allow GitHub Copilot to auto-generate complete project documentation based on recent code changes.",
          "It enables GitHub Copilot to suggest complex business logic based on past customer data without any user feedback.",
          "Using custom models enables Copilot to automatically fix all syntax errors in the project files.",
          "GitHub Copilot can incorporate team-specific patterns and architecture, reducing the need for redundant explanations of common design choices."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are a team lead in a software development company that has recently adopted GitHub Copilot. You've heard about GitHub Copilot Chat, which adds an interactive chat feature to Copilot, and you want to present its main features to your team. Which of the following are key features of GitHub Copilot Chat?",
        choices: [
          "Automatically refactors entire codebases upon request.",
          "Generates detailed test cases based on user prompts.",
          "Collaborates in real-time with other developers on the same project.",
          "Provides step-by-step explanations for suggested code snippets."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are a software developer working on a large codebase. Your company has implemented GitHub Copilot to help developers be more productive by providing AI-based code suggestions. You're currently working on a new feature in an existing project, and you need to implement a complex function. Copilot suggests a code block that appears to do what you need, but it is unfamiliar to you. Which of the following is the best practice for using Copilot in this scenario to ensure both productivity and code quality?",
        choices: [
          "Use Copilot's suggestion as a placeholder and refactor it later after completing the feature.",
          "Assume that Copilot's suggestions are always optimized and secure, so minimal review is needed.",
          "Manually review the suggested code to understand its logic before integrating it.",
          "Accept the suggestion without any review."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are a developer working on a complex project and you've recently enabled GitHub Copilot Chat to enhance your coding experience. You want to know which features are provided by GitHub Copilot Chat. Which of the following are features offered by GitHub Copilot Chat? Select 3.",
        choices: [
          "Detailed explanations of complex code snippets directly within the IDE.",
          "Context-aware coding suggestions based on the current file and project.",
          "Real-time collaboration with team members in a shared chat environment.",
          "Ability to ask questions about the codebase and receive AI-driven answers.",
          "Automated bug detection and correction."
        ],
        correct: [0,1,3],
        multiple: true
      },
      {
        text: "As a junior developer, you've recently started using GitHub Copilot Chat to assist in your coding tasks. You want to ensure you're getting the best out of the AI assistant while maintaining code quality, security, and efficiency. During a session, Copilot suggests a code snippet. Before accepting it, what best practice should you follow?",
        choices: [
          "Copy the code from Copilot and paste it directly into your production codebase.",
          "Review the suggested code for security vulnerabilities and bugs.",
          "Disable all linting tools to avoid conflicts with Copilot suggestions.",
          "Always accept the first suggestion without reviewing the code."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are a developer working on a project in a local environment and you often switch between your code editor and terminal. To streamline your workflow, you decide to integrate GitHub Copilot in your command line interface (CLI) to generate code suggestions directly in the terminal. Select the correct answer describing Copilot commands.",
        choices: [
          "copilot suggest — manually triggers a code suggestion in the terminal based on the current code context.",
          "Copilot enable — enables GitHub Copilot functionality in the terminal for continuous suggestions.",
          "Copilot activate — activates GitHub Copilot in the CLI and starts generating suggestions.",
          "Copilot — runs GitHub Copilot to analyze your code and give feedback in the CLI."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are a software engineer using GitHub Copilot to help generate code for a new data processing feature. The project requires handling sensitive user data including personally identifiable information (PII). Copilot suggests a code snippet that performs data validation but you are unsure about its handling of sensitive data. What is the most responsible action you should take to ensure compliance with ethical AI usage and data privacy regulations?",
        choices: [
          "Test the code for security flaws using an automated tool without reviewing it manually since automated tools can detect any issues related to sensitive data.",
          "Assume that since Copilot suggested the code it has already undergone internal review for regulatory compliance and you can focus on other project areas.",
          "Immediately implement the Copilot-suggested code snippet as AI models are designed to follow best practices.",
          "Analyze the code generated by Copilot to ensure that it follows best practices for handling PII, such as data encryption and anonymization, before implementing it."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are a project manager for a development team and you're trying to decide which GitHub Copilot plan would be best for your team. Your team works on both public and private repositories and some developers need enterprise-level compliance and security features. What plan should you select and why?",
        choices: [
          "GitHub Copilot free",
          "GitHub Copilot for enterprise",
          "GitHub Copilot for business",
          "GitHub Copilot individual"
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "Your team is developing a health tech application that processes patient data and you are concerned about GitHub Copilot potentially suggesting content based on sensitive health information present in your codebase. To mitigate this risk, you want to ensure that Copilot doesn't use sensitive files containing PII (personally identifiable information) when making code suggestions. Which of the following content exclusion methods would be the most appropriate for this scenario?",
        choices: [
          "Manually marking sensitive files with comments indicating that they contain PII and should not be used by Copilot for suggestions.",
          "Using a separate Git branch for sensitive files and assuming Copilot will not process content from that branch unless it is merged into the main branch.",
          "Configuring a .copilotignore file and listing directories or files that contain PII to ensure they are excluded from Copilot's suggestions.",
          "Using access controls to limit who can use GitHub Copilot on the project, assuming that restricted access will prevent Copilot from using sensitive files for suggestions."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are advising a software development company on the key differences between GitHub Copilot Individual and GitHub Copilot Business to help them decide which plan is more suitable for their development team. Which of the following is a key difference between the two plans?",
        choices: [
          "Both plans offer centralized billing for organizations.",
          "GitHub Copilot Business includes IP indemnity and corporate data exclusions while Copilot Individual does not.",
          "GitHub Copilot Individual offers more extensive integration with corporate GitHub repositories than Copilot Business.",
          "GitHub Copilot Individual allows multiple users to share access through role-based controls while Copilot Business does not."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are working on a multi-language project that includes Python, JavaScript, and HTML. GitHub Copilot offers suggestions that seem to consider the full scope of the project, including multiple languages. You're curious how Copilot understands and identifies relevant code snippets for each language. Which of the following best explains how GitHub Copilot identifies matching code in a multi-language project?",
        choices: [
          "Copilot requires manual configuration for each language in a multi-language project to ensure accurate code suggestions.",
          "Copilot scans each file individually to detect the language in use and then suggests code based on the syntax and libraries of that file alone.",
          "Copilot uses a single model trained on multiple programming languages, identifying matching code by recognizing syntax patterns and context across languages.",
          "Copilot uses separate models for each programming language, identifying matching code by switching models as you write in different languages."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are working with a team to implement GitHub Copilot for various coding projects and need to understand the limitations of GitHub Copilot as a tool based on a large language model (LLM). As you plan your strategy for integrating Copilot into the workflow, which of the following statements accurately describe the limitations of GitHub Copilot and large language models in general? Select 2.",
        choices: [
          "GitHub Copilot may generate code that does not always compile correctly or fit within the specific syntax rules of a language.",
          "GitHub Copilot is designed to understand project-specific requirements such as business logic and domain-specific rules through its initial setup.",
          "GitHub Copilot has an inherent understanding of the context of the entire software project including long-term goals and architecture.",
          "GitHub Copilot can generate code based on patterns but cannot ensure that the suggested code is optimal for performance.",
          "GitHub Copilot's generated code can be used in production systems without any further testing or validation."
        ],
        correct: [0,3],
        multiple: true
      },
      {
        text: "Your company is deciding whether to implement GitHub Copilot Chat in its development workflow. You have been tasked with identifying the most effective use cases for this tool. In which of the following situations is GitHub Copilot Chat most effective?",
        choices: [
          "When needing quick automated deployment scripts across multiple cloud platforms.",
          "When learning a new programming language and needing explanations for syntax and code patterns.",
          "When generating comprehensive project documentation.",
          "When performing complex database migrations across multiple environments."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "A development team is working on a large-scale e-commerce platform with code that has accumulated technical debt over the years. They want to use GitHub Copilot to assist in refactoring the codebase to improve maintainability and performance. Which of the following is the best use of GitHub Copilot for this code refactoring task?",
        choices: [
          "Ask GitHub Copilot to generate entirely new functions for all legacy components without reviewing them as the AI can be trusted to write more efficient code.",
          "Rely on GitHub Copilot to refactor all the code automatically without developer input to save time and ensure consistency across the project.",
          "Use GitHub Copilot to suggest refactoring improvements for small, isolated pieces of code. Then manually evaluate and test the changes before integrating them.",
          "Use GitHub Copilot only for generating documentation of the legacy codebase before refactoring but avoid having it suggest any code changes."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are a developer working on a project with a team of five. Your team needs access to GitHub Copilot to assist with code completion, but the team lead is concerned about the cost of providing Copilot to all members. The team also wants to ensure the code generated by Copilot complies with company policies and minimizes any potential risk of using third-party code. The team lead asks you to explore GitHub Copilot's available plans and suggest the best option. Which GitHub Copilot plan is most appropriate for your team and why?",
        choices: [
          "GitHub Copilot free plan",
          "GitHub Enterprise plan",
          "GitHub Copilot for individuals",
          "GitHub Copilot for business"
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are working in a private repository and you use GitHub Copilot to assist in writing code. You're concerned about how Copilot handles the data within the repository. You want to ensure that none of your proprietary code is shared externally. How does GitHub Copilot handle data from private repositories?",
        choices: [
          "Copilot does not access or use the code from private repositories to train models or suggest it to others.",
          "Copilot processes code locally on your machine and no data from the repository is sent to the cloud.",
          "Copilot reads all private repository code and uses it to train its public models.",
          "Copilot can suggest code from your private repository to other users working on similar projects."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are a lead developer at a company that is considering upgrading to GitHub Copilot Business to enhance developer productivity. The engineering manager asks you to highlight the main features of GitHub Copilot Business and how it differs from other GitHub Copilot plans. Which of the following is an accurate feature of GitHub Copilot Business?",
        choices: [
          "Centralized management of seat licenses and policy enforcement for large teams.",
          "Higher priority access to Copilot suggestions, reducing suggestion latency in repositories with high traffic.",
          "The ability to integrate Copilot with third-party AI code completion tools.",
          "Copilot Chat, which allows developers to ask natural language questions and get AI-generated responses within their IDE."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are leading a team of developers on a large project and your team is considering adopting GitHub Copilot Chat to assist with daily coding tasks, provide code explanations, and troubleshoot issues faster. Your team wants to ensure they fully understand the capabilities of GitHub Copilot Chat before integration. Which of the following describes the most significant feature that GitHub Copilot Chat provides for developers?",
        choices: [
          "Interactive chat with an AI assistant that provides context-aware code suggestions, explanations, and troubleshooting advice based on the developer's code.",
          "Automated task management and ticket assignment based on code complexity and team availability.",
          "Real-time collaboration between multiple developers through an interactive chat window embedded in the GitHub web interface.",
          "A virtual assistant that automatically pushes and merges code to the repository based on developer conversations."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are leading a development team working on a financial software project. The codebase includes sensitive information such as encryption keys, financial algorithms, and user data. You want to use GitHub Copilot to accelerate development but need to ensure that Copilot does not access certain sensitive files. You decide to implement content exclusions to prevent this information from being processed. Which of the following approaches is the best way to implement content exclusions with GitHub Copilot?",
        choices: [
          "Use code comments to tell Copilot to exclude specific sections of code from its suggestions.",
          "Obfuscate sensitive data within the code to ensure Copilot doesn't understand it.",
          "Disable GitHub Copilot only for specific files or directories that contain sensitive information.",
          "Disable GitHub Copilot for the entire project to ensure all sensitive files are excluded."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are managing a team of developers using GitHub Copilot to speed up coding tasks. Your company handles highly sensitive customer data and must comply with privacy regulations like GDPR. During a code review, you discover that GitHub Copilot suggested code snippets based on patterns that resemble sensitive information from previous projects. The team needs to implement safeguards to ensure Copilot doesn't leak sensitive information from the current or past projects. What safeguards should your team put in place to prevent sensitive data from being exposed through GitHub Copilot suggestions?",
        choices: [
          "Disable GitHub Copilot across the entire project to ensure no sensitive data is leaked.",
          "Encrypt sensitive data within the codebase to ensure it is not accessible by Copilot.",
          "Request GitHub to remove all instances of sensitive data from their Copilot training model.",
          "Use Copilot in private mode to limit data sharing and exclude sensitive data files from Copilot's context."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are a software engineer working on a complex codebase and start using GitHub Copilot to suggest code snippets. You want to understand how Copilot generates suggestions in real time and how it aligns with your project's context. What best describes how GitHub Copilot works to provide relevant code suggestions?",
        choices: [
          "GitHub Copilot uses AI trained on open-source and licensed repositories to predict code based on the context in the editor.",
          "GitHub Copilot relies entirely on past code suggestions you've accepted to predict future recommendations.",
          "GitHub Copilot retrieves pre-written code snippets from GitHub repositories that match the keywords you use.",
          "GitHub Copilot randomly suggests code snippets from public repositories regardless of your project context."
        ],
        correct: [0],
        multiple: false
      },
      {
        text: "You are developing an e-commerce application in JavaScript that interacts with a payment API. You want GitHub Copilot to generate a function that processes a payment, handles API errors, and logs the transaction ID if successful. Which of the following prompts is most effectively engineered to guide GitHub Copilot to generate correct and robust code?",
        choices: [
          "Write a JavaScript payment processing function.",
          "Create JavaScript code that makes API requests.",
          "Write a JavaScript function to process payments using a payment API. Handle API errors and log transaction ID on success.",
          "Write a JavaScript function to process payments using a payment API."
        ],
        correct: [2],
        multiple: false
      },
      {
        text: "You are developing an application in Java and using GitHub Copilot to assist with generating repetitive code such as setting up getter and setter methods. However, you've noticed that Copilot sometimes generates code that doesn't quite match the style or structure of your project. This prompts you to investigate how the context for a prompt is determined and how it influences Copilot's suggestions. Which of the following best explains how GitHub Copilot determines the context of a prompt and uses it to generate code suggestions?",
        choices: [
          "Copilot always analyzes the entire project across all files to provide suggestions that are consistent with the overall architecture of the project.",
          "GitHub Copilot analyzes the surrounding code and comments within the file to understand the context of the prompt, generating suggestions based on the patterns and structure in the visible part of the file.",
          "GitHub Copilot uses only the text on the current line where the cursor is located, ignoring the rest of the file to generate code suggestions.",
          "GitHub Copilot determines the context based solely on the function or class where the cursor is positioned and excludes any other information in the file."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are a senior developer in a large organization that is evaluating whether to upgrade from GitHub Copilot for Teams to GitHub Copilot Enterprise. Your manager asks you to provide a summary of the key features that are available in GitHub Copilot Enterprise and how they differ from other Copilot plans. Which of the following features are exclusive to GitHub Copilot Enterprise?",
        choices: [
          "Shared Copilot prompts for organizational knowledge.",
          "Priority support and custom SLA options.",
          "Integrated code review suggestions.",
          "Enhanced security and compliance features."
        ],
        correct: [3],
        multiple: false
      },
      {
        text: "You are working on a large project and notice that GitHub Copilot's suggestions sometimes seem irrelevant to the code you are working on, especially when dealing with files with many lines of code. You want to understand why this is happening and how GitHub Copilot handles large files. Which of the following statements best describes the limitations of GitHub Copilot in relation to limited context windows?",
        choices: [
          "GitHub Copilot processes all lines of code in a file but prioritizes recent changes near the cursor.",
          "GitHub Copilot can only take into account a limited number of lines of code around the cursor due to the limited context window.",
          "GitHub Copilot can analyze and understand the entire project, no matter how large the files are.",
          "GitHub Copilot has no issues with context windows as it continuously learns from the entire codebase as you write more code."
        ],
        correct: [1],
        multiple: false
      },
      {
        text: "You are working on a Python project and want GitHub Copilot to generate a function that reads a CSV file and processes the data to calculate the average of a specific column. Your initial prompt is simply 'write a function to read a CSV file and calculate the average of a column'. However, Copilot's suggestions are either incomplete or inaccurate, failing to handle missing data or file errors. Which of the following revised prompts best follows prompt crafting best practices to get accurate and complete results from GitHub Copilot?",
        choices: [
          "Write a Python function for reading and calculating averages from CSVs.",
          "Create a Python function that calculates the mean of a column from a CSV file.",
          "Write a Python function that reads a CSV file and returns the average of a specified column, handling missing data and file errors.",
          "Write a Python function to calculate the average of a CSV column."
        ],
        correct: [2],
        multiple: false
      }
    ];