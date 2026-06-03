// Generated from sources by scripts/build-exam-questions.mjs
// AI-102: 330 questions (178 quiz-eligible MC)

export const ai102Questions = [
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 2,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "A key for Azure Cognitive Services was generated in Azure Key Vault.",
      "A new query key was generated.",
      "The primary subscription key and the secondary subscription key were rotated.",
      "The secondary subscription key was reset."
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You successfully run the following HTTP request.\nPOST https://management.azure.com/subscriptions/18c51a87-3a69-47a8-aedc-a54745f708a1/resourceGroups/RG1/providers/\nMicrosoft.CognitiveServices/accounts/contoso1/regenerateKey?api-version=2017-04-18\nBody{\"keyName\": \"Key2\"}\nWhat is the result of the request?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 5,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "transparency",
      "fairness",
      "inclusiveness",
      "reliability and safety"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are developing a new sales system that will process the video and text from a public-facing website.\nYou plan to notify users that their data has been processed by the sales system.\nWhich responsible AI principle does this help meet?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 9,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Anomaly Detector",
      "Cognitive Search",
      "Form Recognizer",
      "Custom Vision"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You plan to perform predictive maintenance.\nYou collect IoT sensor data from 100 industrial machines for a year. Each machine has 50 different sensors that generate data at one-minute intervals. In total, you have 5,000 time series datasets.\nYou need to identify unusual values in each time series to help predict machinery failures.\nWhich Azure service should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 11,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0002500001.png"
    ],
    "explanation": "Reference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/what-are-cognitive-services",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are developing an internet-based training solution for remote learners.\nYour company identifies that during the training, some learners leave their desk for long periods or become distracted.\nYou need to use a video and audio feed from each learner's computer to detect whether the learner is present and paying attention. The solution must minimize development effort and identify each learner.\nWhich Azure Cognitive Services service should you use for each requirement? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0002500001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 16,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0002900001.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou need to develop an automated call handling system that can respond to callers in their own language. The system will support only French and English.\nWhich Azure Cognitive Services service should you use to meet each requirement? To answer, drag the appropriate services to the correct requirements. Each service may be used once, more than once, or not at all. You may need to drag the split bat between panes or scroll to view content.\nNOTE: Each correct selection is worth one point.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0002900001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 22,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Implement authentication for bot1.",
      "Enable active learning for lu1.",
      "Host lu1 in a container.",
      "Add Direct Line Speech to bot1."
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have a Language Understanding resource named lu1.\nYou build and deploy an Azure bot named bot1 that uses lu1.\nYou need to ensure that bot1 adheres to the Microsoft responsible AI principle of inclusiveness.\nHow should you extend bot1?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 24,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0003500001.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are building an app that will process incoming email and direct messages to either French or English language support teams.\nWhich Azure Cognitive Services API should you use? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0003500001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 31,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Face",
      "Computer Vision",
      "Azure Video Analyzer for Media (formerly Video Indexer)"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You have a factory that produces food products.\nYou need to build a monitoring solution for staff compliance with personal protective equipment (PPE) requirements. The solution must meet the following requirements:\n* Identify staff who have removed masks or safety glasses.\n* Perform a compliance check every 15 minutes.\n* Minimize development effort.\n* Minimize costs.\nWhich service should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 34,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Custom Vision",
      "Personalizer",
      "Form Recognizer",
      "Computer Vision"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "Your company wants to reduce how long it takes for employees to log receipts in expense reports. All the receipts are in English.\nYou need to extract top-level information from the receipts, such as the vendor and the transaction total. The solution must minimize development effort.\nWhich Azure service should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 37,
    "images": [],
    "explanation": "Step 1: Provision a Cognitive Services resource\nIf you don't already have one in your subscription, you'll need to provision a Cognitive Services resource.\n1. Open the Azure portal at https://portal.azure.com, and sign in using the Microsoft account associated with your Azure subscription.\n2. Select the Create a resource button, search for cognitive services, and create a Cognitive Services resource with the following settings:\nSubscription: Your Azure subscription\nResource group: Choose or create a resource group (if you are using a restricted subscription, you may not have permission to create a new resource group - use the one provided)\n\nRegion: East US Azure region -\n\nName: caption12345678 -\n\nPricing tier: Free F0 -\n3. Select the required checkboxes and create the resource.\nWait for deployment to complete, and then view the deployment details.\n4. When the resource has been deployed, go to it and view its Keys and Endpoint page. You will need the endpoint and one of the keys from this page in the next procedure.\nStep 2: Save Key and Endpoint values in Params.json\nOpen the configuration file, C:\\Resources\\Caption\\Params.json. and update the configuration values it contains to reflect the endpoint and an authentication key for your cognitive services resource. Save your changes.\nReference:\nhttps://microsoftlearning.github.io/AI-102-AIEngineer/Instructions/15-computer-vision.html",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nUse the following login credentials as needed:\nTo enter your username, place your cursor in the Sign in box and click on the username below.\nTo enter your password, place your cursor in the Enter password box and click on the password below.\n\nAzure Username: admin@abc.com -\n\nAzure Password: XXXXXXXXXXXX -\nThe following information is for technical support purposes only:\n\nLab Instance: 12345678 -\n\nTask -\nYou plan to analyze stock photography and automatically generate captions for the images.\nYou need to create a service in Azure to analyze the images. The service must be named caption12345678 and must be in the East US Azure region. The solution must use the Free pricing tier.\nIn the C:\\Resources\\Caption\\Params.json folder, enter the value for Key 1 and the endpoint for the new service.\nTo complete this task, sign in to the Azure portal.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 38,
    "images": [],
    "explanation": "Step 1: Create private endpoint for your web app\n1. In the left-hand menu, select All Resources > caption12345678 - the name of your web app.\n2. In the web app overview, select Settings > Networking.\n3. In Networking, select Private endpoints.\n4. Select + Add in the Private Endpoint connections page.\n5. Enter or select the following information in the Add Private Endpoint page:\nName: Enter caption12345678.\nSubscription Select your Azure subscription.\nVirtual network Select VNet1.\nSubnet: -\nIntegrate with private DNS zone: Select Yes.\n6. Select OK.\n\nReference:\nhttps://docs.microsoft.com/en-us/azure/private-link/tutorial-private-endpoint-webapp-portal",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nUse the following login credentials as needed:\nTo enter your username, place your cursor in the Sign in box and click on the username below.\nTo enter your password, place your cursor in the Enter password box and click on the password below.\n\nAzure Username: admin@abc.com -\n\nAzure Password: XXXXXXXXXXXX -\nThe following information is for technical support purposes only:\n\nLab Instance: 12345678 -\n\nTask -\nYou plan to build an application that will use caption12345678. The application will be deployed to a virtual network named VNet1.\nYou need to ensure that only virtual machines on VNet1 can access caption12345678.\nTo complete this task, sign in to the Azure portal.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 39,
    "images": [],
    "explanation": "Manually rotate subscription keys\n1. (Update your application code to reference the secondary key for the Azure account and deploy.)\n2. In the Azure portal, navigate to your Azure account.\n3. Under Settings, select Authentication.\n4. To regenerate the primary key for your Azure account, select the Regenerate button next to the primary key.\n5. (Update your application code to reference the new primary key and deploy.)\n6. Regenerate the secondary key in the same manner.\nReference:\nhttps://github.com/MicrosoftDocs/azure-docs/blob/main/articles/azure-maps/how-to-manage-authentication.md",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nUse the following login credentials as needed:\nTo enter your username, place your cursor in the Sign in box and click on the username below.\nTo enter your password, place your cursor in the Enter password box and click on the password below.\n\nAzure Username: admin@abc.com -\n\nAzure Password: XXXXXXXXXXXX -\nThe following information is for technical support purposes only:\n\nLab Instance: 12345678 -\n\nTask -\nYou need to ensure that a user named admin@abc.com can regenerate the subscription keys of AAA12345678. The solution must use the principle of least privilege.\nTo complete this task, sign in to the Azure portal.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 40,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Azure Metrics Advisor",
      "Form Recognizer",
      "Azure Machine Learning",
      "Anomaly Detector"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You have an Azure IoT hub that receives sensor data from machinery.\n\nYou need to build an app that will perform the following actions:\n\n• Perform anomaly detection across multiple correlated sensors.\n• Identify the root cause of process stops.\n• Send incident alerts.\n\nThe solution must minimize development time.\n\nWhich Azure service should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 43,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Add a human review and approval step before making decisions that affect the staff's financial situation.",
      "Include the Sentiment Analysis results when surveys return a low confidence score.",
      "Use all the surveys, including surveys by customers who requested that their account be deleted and their data be removed.",
      "Publish the raw survey data to a central location and provide the staff with access to the location."
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are building an AI solution that will use Sentiment Analysis results from surveys to calculate bonuses for customer service staff.\n\nYou need to ensure that the solution meets the Microsoft responsible AI principles.\n\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 44,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "a network security group (NSG) for vnet1",
      "Azure Firewall for vnet1",
      "the virtual network settings for ta1",
      "a Language service container for ta1"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains a Language service resource named ta1 and a virtual network named vnet1.\n\nYou need to ensure that only resources in vnet1 can access ta1.\n\nWhat should you configure?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 46,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Application Insights in Azure Monitor",
      "metric alerts in Azure Monitor",
      "Multivariate Anomaly Detection",
      "Univariate Anomaly Detection"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You are developing a monitoring system that will analyze engine sensor data, such as rotation speed, angle, temperature, and pressure. The system must generate an alert in response to atypical values.\n\nWhat should you include in the solution?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 47,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Azure Kubernetes Service (AKS)",
      "Azure Container Instances",
      "a Kubernetes cluster hosted in an Azure Stack Hub integrated system",
      "the Docker Engine"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have an app named App1 that uses an Azure Cognitive Services model to identify anomalies in a time series data stream.\n\nYou need to run App1 in a location that has limited connectivity. The solution must minimize costs.\n\nWhat should you use to host the model?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 49,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "batch",
      "streaming",
      "change points"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are building a solution that will detect anomalies in sensor data from the previous 24 hours.\n\nYou need to ensure that the solution scans the entire dataset, at the same time, for anomalies.\n\nWhich type of detection should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 50,
    "images": [
      "https://img.examtopics.com/ai-102/image45.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\n\nYou are building an app that will scan confidential documents and use the Language service to analyze the contents.\n\nYou provision an Azure Cognitive Services resource.\n\nYou need to ensure that the app can make requests to the Language service endpoint. The solution must ensure that confidential documents remain on-premises.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image45.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 52,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Fluentd",
      "Billing",
      "Http Proxy",
      "Mounts"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an Anomaly Detector resource.\n\nYou deploy a Docker host server named Server1 to the on-premises network.\n\nYou need to host an instance of the Anomaly Detector service on Server1.\n\nWhich parameter should you include in the docker run command?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 53,
    "images": [],
    "explanation": "BD",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Enable a virtual network service endpoint.",
      "Configure a custom subdomain.",
      "Request an X.509 certificate.",
      "Create a private endpoint.",
      "Create a Conditional Access policy."
    ],
    "correct": [
      1,
      3
    ],
    "multiple": true,
    "text": "You are building an app that will use the Speech service.\n\nYou need to ensure that the app can authenticate to the service by using a Microsoft Azure Active Directory (Azure AD), part of Microsoft Entra, token.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 56,
    "images": [],
    "explanation": "BC",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "transparency",
      "fairness",
      "inclusiveness",
      "reliability and safety",
      "privacy and security"
    ],
    "correct": [
      1,
      2
    ],
    "multiple": true,
    "text": "You are developing a new sales system that will process the video and text from a public-facing website.\nYou plan to monitor the sales system to ensure that it provides equitable results regardless of the user's location or background.\nWhich two responsible AI principles provide guidance to meet the monitoring requirements? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 58,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Run the Bot Framework Emulator.",
      "Run the Bot Framework Composer.",
      "Register the bot with Azure Bot Service.",
      "Run Windows Terminal."
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You build a bot by using the Microsoft Bot Framework SDK.\n\nYou start the bot on a local computer.\n\nYou need to validate the functionality of the bot.\n\nWhat should you do before you connect to the bot?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 60,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "IPsec rules",
      "Azure Application Gateway",
      "a virtual network gateway",
      "virtual network rules"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You are building a solution in Azure that will use Azure Cognitive Service for Language to process sensitive customer data.\n\nYou need to ensure that only specific Azure processes can access the Language service. The solution must minimize administrative effort.\n\nWhat should you include in the solution?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 61,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Azure AI Computer Vision",
      "Cognitive Search",
      "Azure AI Document Intelligence",
      "Azure AI Anomaly Detector"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You plan to perform predictive maintenance.\n\nYou collect IoT sensor data from 100 industrial machines for a year. Each machine has 50 different sensors that generate data at one-minute intervals. In total, you have 5,000 time series datasets.\n\nYou need to identify unusual values in each time series to help predict machinery failures.\n\nWhich Azure service should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 63,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Multivariate Anomaly Detection",
      "Azure Stream Analytics",
      "metric alerts in Azure Monitor",
      "Univariate Anomaly Detection"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You are developing a system that will monitor temperature data from a data stream. The system must generate an alert in response to atypical values. The solution must minimize development effort.\n\nWhat should you include in the solution?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 65,
    "images": [],
    "explanation": "AE",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "In VNet1, enable a service endpoint for CSAccount1.",
      "In CSAccount1, configure the Access control (IAM) settings.",
      "In VNet1, modify the virtual network settings.",
      "In VNet1, create a virtual subnet.",
      "In CSAccount1, modify the virtual network settings."
    ],
    "correct": [
      0,
      4
    ],
    "multiple": true,
    "text": "You have an Azure subscription that contains an Azure AI Service resource named CSAccount1 and a virtual network named VNet1. CSAaccount1 is connected to VNet1.\n\nYou need to ensure that only specific resources can access CSAccount1. The solution must meet the following requirements:\n\n• Prevent external access to CSAccount1.\n• Minimize administrative effort.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct answer is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 66,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "speech-to-text in the Azure AI Speech service",
      "language detection in Azure AI Language Service",
      "the Face service in Azure AI Vision",
      "object detection in Azure AI Custom Vision"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are building an internet-based training solution. The solution requires that a user's camera and microphone remain enabled.\n\nYou need to monitor a video stream of the user and detect when the user asks an instructor a question. The solution must minimize development effort.\n\nWhat should you include in the solution?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 67,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0001200003.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou plan to use containerized versions of the Anomaly Detector API on local devices for testing and in on-premises datacenters.\nYou need to ensure that the containerized deployments meet the following requirements:\n✑ Prevent billing and API information from being stored in the command-line histories of the devices that run the container.\n✑ Control access to the container images by using Azure role-based access control (Azure RBAC).\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\nNOTE: More than one order of answer choices is correct. You will receive credit for any of the correct orders you select.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0001200003.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 68,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "az resource link",
      "az cognitiveservices account network-rule",
      "az cognitiveservices account show",
      "az account list"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have an Azure DevOps pipeline named Pipeline1 that is used to deploy an app. Pipeline1 includes a step that will create an Azure AI services account.\n\nYou need to add a step to Pipeline1 that will identify the created Azure AI services account. The solution must minimize development effort.\n\nWhich Azure Command-Line Interface (CLI) command should you run?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "plan-manage",
    "questionId": 71,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0001500001.png"
    ],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "create_resource(client, \"res1\", \"ComputerVision\", \"F0\", \"westus\")",
      "create_resource(client, \"res1\", \"CustomVision.Prediction\", \"F0\", \"westus\")",
      "create_resource(client, \"res1\", \"ComputerVision\", \"S0\", \"westus\")",
      "create_resource(client, \"res1\", \"CustomVision.Prediction\", \"S0\", \"westus\")"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You have the following C# method for creating Azure Cognitive Services resources programmatically.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0001500001.png]\n\n\nYou need to call the method to create a free Azure resource in the West US Azure region. The resource will be used to generate captions of images automatically.\nWhich code should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "15",
    "domainId": "plan-manage",
    "questionId": 81,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0027000001.jpg"
    ],
    "explanation": "Box 1: name [language]\nChatbot must support interactions in English, Spanish, and Portuguese.\nBox 2: \"$when:${stockLevel != 'OK'}\"\nProduct displays must include images and warnings when stock levels are low or out of stock.\nBox 3: image.altText[language]",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are developing the shopping on-the-go project.\nYou need to build the Adaptive Card for the chatbot.\nHow should you complete the code? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0027000001.jpg]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "15",
    "domainId": "plan-manage",
    "questionId": 83,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0027600001.png"
    ],
    "explanation": "Box 1: name.en -\nBox 2: \"$when\": \"${stockLevel != 'OK'}\"\nProduct displays must include images and warnings when stock levels are low or out of stock.\nBox 3:image.altText.en",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are developing the shopping on-the-go project.\nYou need to build the Adaptive Card for the chatbot.\nHow should you complete the code? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0027600001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "plan-manage",
    "questionId": 182,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "a system-assigned managed identity and an X.509 certificate",
      "the endpoint URI and an OAuth token",
      "the endpoint URI and a shared access signature (SAS) token",
      "the endpoint URI and subscription key"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an Azure App Service app named App1.\n\nYou provision a multi-service Azure Cognitive Services resource named CSAccount1.\n\nYou need to configure App1 to access CSAccount1. The solution must minimize administrative effort.\n\nWhat should you use to configure App1?",
    "questionKind": "mc"
  },
  {
    "topic": "8",
    "domainId": "plan-manage",
    "questionId": 318,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "a text classifier",
      "language detection",
      "text moderation",
      "a blocklist"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an Azure AI Content Safety resource named CS1.\n\nYou plan to build an app that will analyze user-generated documents and identify obscure offensive terms.\n\nYou need to create a dictionary that will contain the offensive terms. The solution must minimize development effort.\n\nWhat should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "8",
    "domainId": "plan-manage",
    "questionId": 319,
    "images": [
      "https://img.examtopics.com/ai-102/image197.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription that contains an Azure AI Content Safety resource named CS1.\n\nYou need to use the SDK to call CS1 to identify requests that contain harmful content.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image197.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "8",
    "domainId": "plan-manage",
    "questionId": 320,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Monitor online activity",
      "Jailbreak risk detection",
      "Moderate text content",
      "Protected material text detection"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an Azure OpenAI resource named AI1.\n\nYou build a chatbot that uses AI1 to provide generative answers to specific questions.\n\nYou need to ensure that questions intended to circumvent built-in safety features are blocked.\n\nWhich Azure AI Content Safety feature should you implement?",
    "questionKind": "mc"
  },
  {
    "topic": "8",
    "domainId": "plan-manage",
    "questionId": 321,
    "images": [
      "https://img.examtopics.com/ai-102/image192.png"
    ],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "0",
      "0.0",
      "7",
      "100"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an Azure AI Content Safety resource named CS1.\n\nYou create a test image that contains a circle.\n\nYou submit the test image to CS1 by using the curl command and the following command-line parameters.\n\n\n[Image: https://img.examtopics.com/ai-102/image192.png]\n\n\n\nWhat should you expect as the output?",
    "questionKind": "mc"
  },
  {
    "topic": "8",
    "domainId": "plan-manage",
    "questionId": 323,
    "images": [
      "https://img.examtopics.com/ai-102/image193.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription that contains an Azure AI Content Safety resource named CS1.\n\nYou need to call CS1 to identify whether a user request contains hateful language.\n\nHow should you complete the command? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image193.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "8",
    "domainId": "plan-manage",
    "questionId": 324,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have an Azure subscription that contains an Azure OpenAI resource named AI1 and an Azure AI Content Safety resource named CS1.\n\nYou build a chatbot that uses AI1 to provide generative answers to specific questions and CS1 to check input and output for objectionable content.\n\nYou need to optimize the content filter configurations by running tests on sample questions.\n\nSolution: From Content Safety Studio, you use the Protected material detection feature to run the tests.\n\nDoes this meet the requirement?",
    "questionKind": "mc"
  },
  {
    "topic": "8",
    "domainId": "plan-manage",
    "questionId": 325,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have an Azure subscription that contains an Azure OpenAI resource named AI1 and an Azure AI Content Safety resource named CS1.\n\nYou build a chatbot that uses AI1 to provide generative answers to specific questions and CS1 to check input and output for objectionable content.\n\nYou need to optimize the content filter configurations by running tests on sample questions.\n\nSolution: From Content Safety Studio, you use the Moderate text content feature to run the tests.\n\nDoes this meet the requirement?",
    "questionKind": "mc"
  },
  {
    "topic": "8",
    "domainId": "plan-manage",
    "questionId": 326,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have an Azure subscription that contains an Azure OpenAI resource named AI1 and an Azure AI Content Safety resource named CS1.\n\nYou build a chatbot that uses AI1 to provide generative answers to specific questions and CS1 to check input and output for objectionable content.\n\nYou need to optimize the content filter configurations by running tests on sample questions.\n\nSolution: From Content Safety Studio, you use the Monitor online activity feature to run the tests.\n\nDoes this meet the requirement?",
    "questionKind": "mc"
  },
  {
    "topic": "8",
    "domainId": "plan-manage",
    "questionId": 327,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have an Azure subscription that contains an Azure OpenAI resource named AI1 and an Azure AI Content Safety resource named CS1.\n\nYou build a chatbot that uses AI1 to provide generative answers to specific questions and CS1 to check input and output for objectionable content.\n\nYou need to optimize the content filter configurations by running tests on sample questions.\n\nSolution: From Content Safety Studio, you use the Safety metaprompt feature to run the tests.\n\nDoes this meet the requirement?",
    "questionKind": "mc"
  },
  {
    "topic": "8",
    "domainId": "plan-manage",
    "questionId": 328,
    "images": [
      "https://img.examtopics.com/ai-102/image195.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription that contains an Azure AI Content Safety resource.\n\nYou are building a social media app that will enable users to share images.\n\nYou need to configure the app to moderate inappropriate content uploaded by the users.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image195.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "9",
    "domainId": "plan-manage",
    "questionId": 330,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0011900001.png"
    ],
    "explanation": "Reference:\nhttps://github.com/Azure-Samples/cognitive-services-dotnet-sdk-samples/blob/master/documentation-samples/quickstarts/ComputerVision/Program.cs",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou need to develop code to upload images for the product creation project. The solution must meet the accessibility requirements.\nHow should you complete the code? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0011900001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "generative-ai",
    "questionId": 54,
    "images": [
      "https://img.examtopics.com/ai-102/image89.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou plan to deploy an Azure OpenAI resource by using an Azure Resource Manager (ARM) template.\n\nYou need to ensure that the resource can respond to 600 requests per minute.\n\nHow should you complete the template? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image89.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "generative-ai",
    "questionId": 57,
    "images": [
      "https://img.examtopics.com/ai-102/image93.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou have an Azure OpenAI resource named AI1 that hosts three deployments of the GPT 3.5 model. Each deployment is optimized for a unique workload.\n\nYou plan to deploy three apps. Each app will access AI1 by using the REST API and will use the deployment that was optimized for the app's intended workload.\n\nYou need to provide each app with access to AI1 and the appropriate deployment. The solution must ensure that only the apps can access AI1.\n\nWhat should you use to provide access to AI1, and what should each app use to connect to its appropriate deployment? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image93.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "generative-ai",
    "questionId": 59,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "the endpoint, key, and model name",
      "the deployment name, key, and model name",
      "the deployment name, endpoint, and key",
      "the endpoint, key, and model type"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have an Azure OpenAI model named AI1.\n\nYou are building a web app named App1 by using the Azure OpenAI SDK.\n\nYou need to configure App1 to connect to AI1.\n\nWhat information must you provide?",
    "questionKind": "mc"
  },
  {
    "topic": "6",
    "domainId": "generative-ai",
    "questionId": 290,
    "images": [
      "https://img.examtopics.com/ai-102/image107.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou have a monitoring solution that uses the Azure AI Anomaly Detector service.\n\nYou provision a server named Server1 that has intermittent internet access.\n\nYou need to deploy the Azure AI Anomaly Detector to Server1.\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image107.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 291,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "the Frequency penalty parameter",
      "abuse monitoring",
      "a content filter",
      "the Temperature parameter"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have an Azure subscription. The subscription contains an Azure OpenAI resource that hosts a GPT-4 model named Model1 and an app named App1. App1 uses Model1.\n\nYou need to ensure that App1 will NOT return answers that include hate speech.\n\nWhat should you configure for Model1?",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 293,
    "images": [
      "https://img.examtopics.com/ai-102/image145.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription that contains an Azure OpenAI resource named AI1.\n\nYou plan to develop a console app that will answer user questions.\n\nYou need to call AI1 and output the results to the console.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image145.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 294,
    "images": [
      "https://img.examtopics.com/ai-102/image147.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription that contains an Azure OpenAI resource named AI1.\n\nYou plan to develop a console app that will answer user questions.\n\nYou need to call AI1 and output the results to the console.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image147.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 296,
    "images": [
      "https://img.examtopics.com/ai-102/image160.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have a chatbot that uses Azure OpenAI to generate responses.\n\nYou need to upload company data by using Chat playground. The solution must ensure that the chatbot uses the data to answer user questions.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image160.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 297,
    "images": [
      "https://img.examtopics.com/ai-102/image162.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription that is linked to a Microsoft Entra tenant. The subscription ID is x1xx11x1-x111-xxxx-xxxx-x1111xxx11x1 and the tenant ID is 1y1y1yyy-1y1y-y1y1-yy11-y1y1y11111y1.\n\nThe subscription contains an Azure OpenAI resource named OpenAI1 that has a primary API key of 1111a111a11a111aaa11a1a1a11a11aa. OpenAI1 has a deployment named embeddings1 that uses the text-embedding-ada-002 model.\n\nYou need to query OpenAI1 and retrieve embeddings for text input.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image162.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 298,
    "images": [
      "https://img.examtopics.com/ai-102/image164.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nIn Azure OpenAI Studio, you are prototyping a chatbot by using Chat playground.\n\nYou need to configure the chatbot to meet the following requirements:\n\n• Reduce the repetition of words in conversations.\n• Reduce the randomness of each response.\n\nWhich two parameters should you modify? To answer, select the appropriate parameters in the answer area.\n\nNOTE: Each correct answer is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image164.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 299,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "GPT-3.5",
      "GPT-4",
      "embeddings",
      "DALL-E"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have an Azure subscription.\n\nYou need to build an app that will compare documents for semantic similarity. The solution must meet the following requirements:\n\n• Return numeric vectors that represent the tokens of each document.\n• Minimize development effort.\n\nWhich Azure OpenAI model should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 300,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "CSV",
      "XML",
      "JSONL",
      "TSV"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have an Azure OpenAI model.\n\nYou have 500 prompt-completion pairs that will be used as training data to fine-tune the model.\n\nYou need to prepare the training data.\n\nWhich format should you use for the training data file?",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 301,
    "images": [
      "https://img.examtopics.com/ai-102/image186.png"
    ],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "File1.tsv only",
      "File2.xml only",
      "File3.pdf only",
      "File4.xlsx only",
      "File1.tsv and File4.xslx only",
      "File1.tsv, File2.xml and File4.xslx only",
      "File1.tsv, File2.xml, File3.pdf and File4.xslx"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You have a custom Azure OpenAI model.\n\nYou have the files shown in the following table.\n\n\n[Image: https://img.examtopics.com/ai-102/image186.png]\n\n\n\nYou need to prepare training data for the model by using the OpenAI CLI data preparation tool.\n\nWhich files can you upload to the tool?",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 302,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Cognitive Services OpenAI Contributor",
      "Cognitive Services Contributor",
      "Cognitive Services OpenAI User",
      "Contributor"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an Azure OpenAI resource named OpenAI1 and a user named User1.\n\nYou need to ensure that User1 can upload datasets to OpenAI1 and finetune the existing models. The solution must follow the principle of least privilege.\n\nWhich role should you assign to User1?",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 303,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "few-shot learning",
      "affordance",
      "chain of thought",
      "priming"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have an Azure subscription. The subscription contains an Azure OpenAI resource that hosts a GPT-3.5 Turbo model named Model1.\n\nYou configure Model1 to use the following system message: “You are an AI assistant that helps people solve mathematical puzzles. Explain your answers as if the request is by a 4-year-old.”\n\nWhich type of prompt engineering technique is this an example of?",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 305,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "text-embedding-ada-002",
      "GPT-4",
      "GPT-35 Turbo",
      "GPT-4-32k"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You have an Azure subscription and 10,000 ASCII files.\n\nYou need to identify files that contain specific phrases. The solution must use cosine similarity.\n\nWhich Azure OpenAI model should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 306,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Cognitive Services OpenAI User",
      "Cognitive Services Contributor",
      "Contributor",
      "Cognitive Services OpenAI Contributor"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an Azure OpenAI resource named AI1 and a user named User1.\n\nYou need to ensure that User1 can perform the following actions in Azure OpenAI Studio:\n\n• Identify resource endpoints.\n• View models that are available for deployment.\n• Generate text and images by using the deployed models.\n\nThe solution must follow the principle of least privilege.\n\nWhich role should you assign to User1?",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 307,
    "images": [
      "https://img.examtopics.com/ai-102/image187.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have a chatbot that uses Azure OpenAI to generate responses.\n\nYou need to upload company data by using Chat playground. The solution must ensure that the chatbot uses the data to answer user questions.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image187.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 309,
    "images": [
      "https://img.examtopics.com/ai-102/image109.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou build a chatbot by using Azure OpenAI Studio.\n\nYou need to ensure that the responses are more deterministic and less creative.\n\nWhich two parameters should you configure? To answer, select the appropriate parameters in the answer area.\n\nNOTE: Each correct answer is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image109.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 310,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Configure the model to include data from the travel agent's database.",
      "Set the Top P parameter for the model to 0.",
      "Set the Temperature parameter for the model to 0.",
      "Modify the system message used by the model to specify that the answers must be accurate."
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are building a chatbot for a travel agent. The chatbot will use the Azure OpenAI GPT 3.5 model and will be used to make travel reservations.\n\nYou need to maximize the accuracy of the responses from the chatbot.\n\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 311,
    "images": [],
    "explanation": "BC",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Fine-tune the model.",
      "Provide grounding content.",
      "Add sample request/response pairs.",
      "Retrain the language model by using your own data.",
      "Train a custom large language model (LLM)."
    ],
    "correct": [
      1,
      2
    ],
    "multiple": true,
    "text": "You build a chatbot that uses the Azure OpenAI GPT 3.5 model.\n\nYou need to improve the quality of the responses from the chatbot. The solution must minimize development effort.\n\nWhat are two ways to achieve the goal? Each correct answer presents a complete solution.\n\nNOTE: Each correct answer is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 312,
    "images": [
      "https://img.examtopics.com/ai-102/image111.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou have an Azure subscription that contains an Azure OpenAI resource named AI1.\n\nYou build a chatbot that will use AI1 to provide generative answers to specific questions.\n\nYou need to ensure that the responses are more creative and less deterministic.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image111.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 313,
    "images": [
      "https://img.examtopics.com/ai-102/image113.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou have an Azure subscription that contains an Azure OpenAI resource named AI1.\n\nYou plan to build an app named App1 that will write press releases by using AI1.\n\nYou need to deploy an Azure OpenAI model for App1. The solution must minimize development effort.\n\nWhich three actions should you perform in sequence in Azure OpenAI Studio? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image113.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 314,
    "images": [
      "https://img.examtopics.com/ai-102/image140.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription that contains an Azure OpenAI resource named AI1.\n\nYou build a chatbot that will use AI1 to provide generative answers to specific questions.\n\nYou need to ensure that the responses are more creative and less deterministic.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image140.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "7",
    "domainId": "generative-ai",
    "questionId": 315,
    "images": [
      "https://img.examtopics.com/ai-102/image142.png",
      "https://img.examtopics.com/ai-102/image143.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou have an Azure subscription that contains an Azure OpenAI resource.\n\nYou configure a model that has the following settings:\n\n• Temperature: 1\n• Top probabilities: 0.5\n• Max response tokens: 100\n\nYou ask the model a question and receive the following response.\n\n\n[Image: https://img.examtopics.com/ai-102/image142.png]\n\n[Image: https://img.examtopics.com/ai-102/image143.png]\n\n\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image142.png]\n\n[Image: https://img.examtopics.com/ai-102/image143.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "8",
    "domainId": "generative-ai",
    "questionId": 316,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Microsoft Defender Threat Intelligence (Defender TI)",
      "Azure AI Content Safety",
      "Log Analytics",
      "Azure Machine Leaning"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an Azure OpenAI resource named AI1.\n\nYou build a chatbot that uses AI1 to provide generative answers to specific questions.\n\nYou need to ensure that the chatbot checks all input and output for objectionable content.\n\nWhich type of resource should you create first?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "computer-vision",
    "questionId": 33,
    "images": [],
    "explanation": "Step 1: In the Azure dashboard, click Create a resource.\nStep 2: In the search bar, type \"Cognitive Services.\"\nYou'll get information about the cognitive services resource and a legal notice. Click Create.\nStep 3: You'll need to specify the following details about the cognitive service (refer to the image below for a completed example of this page):\nSubscription: choose your paid or trial subscription, depending on how you created your Azure account.\nResource group: click create new to create a new resource group or choose an existing one.\nRegion: choose the Azure region for your cognitive service. Choose: East US Azure region.\nName: choose a name for your cognitive service. Enter: AAA12345678\nPricing Tier: Select: Free pricing tier\n\nStep 4: Review and create the resource, and wait for deployment to complete. Then go to the deployed resource.\nNote: The Computer Vision Image Analysis service can extract a wide variety of visual features from your images. For example, it can determine whether an image contains adult content, find specific brands or objects, or find human faces.\n\nTag visual features -\nIdentify and tag visual features in an image, from a set of thousands of recognizable objects, living things, scenery, and actions. When the tags are ambiguous or not common knowledge, the API response provides hints to clarify the context of the tag. Tagging isn't limited to the main subject, such as a person in the foreground, but also includes the setting (indoor or outdoor), furniture, tools, plants, animals, accessories, gadgets, and so on.\nTry out the image tagging features quickly and easily in your browser using Vision Studio.\nReference:\nhttps://docs.microsoft.com/en-us/learn/modules/analyze-images-computer-vision/3-analyze-images https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/overview-image-analysis",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nUse the following login credentials as needed:\nTo enter your username, place your cursor in the Sign in box and click on the username below.\nTo enter your password, place your cursor in the Enter password box and click on the password below.\n\nAzure Username: admin@abc.com -\n\nAzure Password: XXXXXXXXXXXX -\nThe following information is for technical support purposes only:\n\nLab Instance: 12345678 -\n\nTask -\nYou plan to build an API that will identify whether an image includes a Microsoft Surface Pro or Surface Studio.\nYou need to deploy a service in Azure Cognitive Services for the API. The service must be named AAA12345678 and must be in the East US Azure region. The solution must use the Free pricing tier.\nTo complete this task, sign in to the Azure portal.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "computer-vision",
    "questionId": 35,
    "images": [],
    "explanation": "Step 1: In the Azure dashboard, click Create a resource.\nStep 2: In the search bar, type \"Cognitive Services.\"\nYou'll get information about the cognitive services resource and a legal notice. Click Create.\nStep 3: You'll need to specify the following details about the cognitive service (refer to the image below for a completed example of this page):\nSubscription: choose your paid or trial subscription, depending on how you created your Azure account.\nResource group: click create new to create a new resource group or choose an existing one.\nRegion: choose the Azure region for your cognitive service. Choose: East US Azure region.\nName: choose a name for your cognitive service. Enter: AAA12345678\nPricing Tier: Select: Free pricing tier\nStep 4: Review and create the resource, and wait for deployment to complete. Then go to the deployed resource.\nNote: The Computer Vision Image Analysis service can extract a wide variety of visual features from your images. For example, it can determine whether an image contains adult content, find specific brands or objects, or find human faces.\n\nTag visual features -\nIdentify and tag visual features in an image, from a set of thousands of recognizable objects, living things, scenery, and actions. When the tags are ambiguous or not common knowledge, the API response provides hints to clarify the context of the tag. Tagging isn't limited to the main subject, such as a person in the foreground, but also includes the setting (indoor or outdoor), furniture, tools, plants, animals, accessories, gadgets, and so on.\nTry out the image tagging features quickly and easily in your browser using Vision Studio.\nReference:\nhttps://docs.microsoft.com/en-us/learn/modules/analyze-images-computer-vision/3-analyze-images https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/overview-image-analysis",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nUse the following login credentials as needed:\nTo enter your username, place your cursor in the Sign in box and click on the username below.\nTo enter your password, place your cursor in the Enter password box and click on the password below.\n\nAzure Username: admin@abc.com -\n\nAzure Password: XXXXXXXXXXXX -\nThe following information is for technical support purposes only:\n\nLab Instance: 12345678 -\n\nTask -\nYou need to build an API that uses the service in Azure Cognitive Services named AAA12345678 to identify whether an image includes a Microsoft Surface Pro or\nSurface Studio.\nTo achieve this goal, you must use the sample images in the C:\\Resources\\Images folder.\nTo complete this task, sign in to the Azure portal.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "computer-vision",
    "questionId": 41,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "readInStreamAsync",
      "analyzeImagesByDomainInStreamAsync",
      "tagImageInStreamAsync",
      "describeImageInStreamAsync"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have an app that analyzes images by using the Computer Vision API.\n\nYou need to configure the app to provide an output for users who are vision impaired. The solution must provide the output in complete sentences.\n\nWhich API call should you perform?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "computer-vision",
    "questionId": 42,
    "images": [
      "https://img.examtopics.com/ai-102/image1.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou have a Custom Vision service project that performs object detection. The project uses the General domain for classification and contains a trained model.\n\nYou need to export the model for use on a network that is disconnected from the internet.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image1.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "computer-vision",
    "questionId": 64,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Upload File1.avi to the www.youtube.com webpage, and then copy the URL of the video to the Azure AI Video Indexer website.",
      "Download File1.avi to a local computer, and then upload the file to the Azure AI Video Indexer website.",
      "From OneDrive, create a download link, and then copy the link to the Azure AI Video Indexer website.",
      "From OneDrive, create a sharing link for File1.avi, and then copy the link to the Azure AI Video Indexer website."
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have a Microsoft OneDrive folder that contains a 20-GB video file named File1.avi.\n\nYou need to index File1.avi by using the Azure Video Indexer website.\n\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "10",
    "domainId": "computer-vision",
    "questionId": 73,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Create a custom language model",
      "Configure audio indexing for videos only",
      "Enable multi-language detection for videos",
      "Build a custom Person model for webinar presenters"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are developing the knowledgebase.\nYou use Azure Video Analyzer for Media (previously Video indexer) to obtain transcripts of webinars.\nYou need to ensure that the solution meets the knowledgebase requirements.\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 84,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0008000001.png",
      "https://www.examtopics.com/assets/media/exam-media/04271/0008100001.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are developing an application that will use the Computer Vision client library. The application has the following code.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008000001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008100001.png]\n\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008000001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008100001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 85,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Create a person model and associate the model to the videos.",
      "Create person objects and provide face images for each object.",
      "Invite the entire staff of the company to Video Indexer.",
      "Edit the faces in the videos.",
      "Upload names to a language model."
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You have an Azure Video Analyzer for Media (previously Video Indexer) service that is used to provide a search interface over company videos on your company's website.\nYou need to be able to search for videos based on who is present in the video.\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 86,
    "images": [],
    "explanation": "AD",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "recall",
      "F-score",
      "weighted accuracy",
      "precision",
      "area under the curve (AUC)"
    ],
    "correct": [
      0,
      3
    ],
    "multiple": true,
    "text": "You use the Custom Vision service to build a classifier.\nAfter training is complete, you need to evaluate the classifier.\nWhich two metrics are available for review? Each correct answer presents a complete solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 87,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0009700001.png"
    ],
    "explanation": "Box 1: LargeFaceListID -\nLargeFaceList: Add a face to a specified large face list, up to 1,000,000 faces.\nNote: Given query face's faceId, to search the similar-looking faces from a faceId array, a face list or a large face list. A \"faceListId\" is created by FaceList - Create containing persistedFaceIds that will not expire. And a \"largeFaceListId\" is created by LargeFaceList - Create containing persistedFaceIds that will also not expire.\nIncorrect Answers:\nNot \"faceListId\": Add a face to a specified face list, up to 1,000 faces.\n\nBox 2: matchFace -\nFind similar has two working modes, \"matchPerson\" and \"matchFace\". \"matchPerson\" is the default mode that it tries to find faces of the same person as possible by using internal same-person thresholds. It is useful to find a known person's other photos. Note that an empty list will be returned if no faces pass the internal thresholds. \"matchFace\" mode ignores same-person thresholds and returns ranked similar faces anyway, even the similarity is low. It can be used in the cases like searching celebrity-looking faces.\nReference:\nhttps://docs.microsoft.com/en-us/rest/api/faceapi/face/findsimilar",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou are developing a call to the Face API. The call must find similar faces from an existing list named employeefaces. The employeefaces list contains 60,000 images.\nHow should you complete the body of the HTTP request? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\nNOTE: Each correct selection is worth one point.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0009700001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 88,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0009800001.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou are developing a photo application that will find photos of a person based on a sample image by using the Face API.\nYou need to create a POST request to find the photos.\nHow should you complete the request? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all.\nYou may need to drag the split bar between panes or scroll to view content.\nNOTE: Each correct selection is worth one point.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0009800001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 89,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0010000001.png",
      "https://www.examtopics.com/assets/media/exam-media/04271/0010000002.png"
    ],
    "explanation": "Box 1: Yes -\n\nBox 2: Yes -\nCoordinates of a rectangle in the API refer to the top left corner.\n\nBox 3: No -\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/concept-brand-detection",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou develop a test method to verify the results retrieved from a call to the Computer Vision API. The call is used to analyze the existence of company logos in images. The call returns a collection of brands named brands.\nYou have the following code segment.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0010000001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0010000002.png]\n\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0010000001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0010000002.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 90,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0010200001.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou develop an application that uses the Face API.\nYou need to add multiple images to a person group.\nHow should you complete the code? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0010200001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 91,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0010400001.png"
    ],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Use a different version of the Face API.",
      "Use the Computer Vision service instead of the Face service.",
      "Use the Identify method instead of the Detect method.",
      "Change the detection model."
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "Your company uses an Azure Cognitive Services solution to detect faces in uploaded images. The method to detect the faces uses the following code.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0010400001.png]\n\n\nYou discover that the solution frequently fails to detect faces in blurred images and in images that contain sideways faces.\nYou need to increase the likelihood that the solution can detect faces in blurred images and images that contain sideways faces.\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 92,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "create_resource(\"res1\", \"ComputerVision\", \"F0\", \"westus\")",
      "create_resource(\"res1\", \"CustomVision.Prediction\", \"F0\", \"westus\")",
      "create_resource(\"res1\", \"ComputerVision\", \"S0\", \"westus\")",
      "create_resource(\"res1\", \"CustomVision.Prediction\", \"S0\", \"westus\")"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You have the following Python function for creating Azure Cognitive Services resources programmatically. def create_resource (resource_name, kind, account_tier, location) : parameters = CognitiveServicesAccount(sku=Sku(name=account_tier), kind=kind, location=location, properties={}) result = client.accounts.create(resource_group_name, resource_name, parameters)\nYou need to call the function to create a free Azure resource in the West US Azure region. The resource will be used to generate captions of images automatically.\nWhich code should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 93,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0010700001.png"
    ],
    "explanation": "BD",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Remove the operation_id parameter.",
      "Add code to verify the read_results.status value.",
      "Add code to verify the status of the read_operation_location value.",
      "Wrap the call to get_read_result within a loop that contains a delay."
    ],
    "correct": [
      1,
      3
    ],
    "multiple": true,
    "text": "You are developing a method that uses the Computer Vision client library. The method will perform optical character recognition (OCR) in images. The method has the following code.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0010700001.png]\n\n\nDuring testing, you discover that the call to the GetReadResultAsync method occurs before the read operation is complete.\nYou need to prevent the GetReadResultAsync method from proceeding until the read operation is complete.\nWhich two actions should you perform? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 94,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0010800001.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are building an app that will enable users to upload images. The solution must meet the following requirements:\n* Automatically suggest alt text for the images.\n* Detect inappropriate images and block them.\n* Minimize development effort.\nYou need to recommend a computer vision endpoint for each requirement.\nWhat should you recommend? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0010800001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 95,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0008200001.jpg"
    ],
    "explanation": "BD",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Remove the Guid.Parse(operationId) parameter.",
      "Add code to verify the results.Status value.",
      "Add code to verify the status of the txtHeaders.Status value.",
      "Wrap the call to GetReadResultAsync within a loop that contains a delay."
    ],
    "correct": [
      1,
      3
    ],
    "multiple": true,
    "text": "You are developing a method that uses the Computer Vision client library. The method will perform optical character recognition (OCR) in images. The method has the following code.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008200001.jpg]\n\n\nDuring testing, you discover that the call to the GetReadResultAsync method occurs before the read operation is complete.\nYou need to prevent the GetReadResultAsync method from proceeding until the read operation is complete.\nWhich two actions should you perform? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 96,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Build an on-premises web app to query the Computer Vision endpoint.",
      "Host the Computer Vision endpoint in a container on an on-premises server.",
      "Host an exported Open Neural Network Exchange (ONNX) model on an on-premises server.",
      "Build an Azure web app to query the Computer Vision endpoint."
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You need to build a solution that will use optical character recognition (OCR) to scan sensitive documents by using the Computer Vision API. The solution must\nNOT be deployed to the public cloud.\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 98,
    "images": [
      "https://img.examtopics.com/ai-102/image3.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou have a library that contains thousands of images.\n\nYou need to tag the images as photographs, drawings, or clipart.\n\nWhich service endpoint and response property should you use? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image3.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 99,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Call the face detection API and retrieve the face rectangle by using the FaceRectangle attribute.",
      "Call the face detection API repeatedly and check for changes to the FaceAttributes.HeadPose attribute.",
      "Call the face detection API and use the FaceLandmarks attribute to calculate the distance between pupils.",
      "Call the face detection API repeatedly and check for changes to the FaceAttributes.Accessories attribute."
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have an app that captures live video of exam candidates.\n\nYou need to use the Face service to validate that the subjects of the videos are real people.\n\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 100,
    "images": [
      "https://img.examtopics.com/ai-102/image5.png",
      "https://img.examtopics.com/ai-102/image6.png",
      "https://img.examtopics.com/ai-102/image7.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou make an API request and receive the results shown in the following exhibits.\n\n\n[Image: https://img.examtopics.com/ai-102/image5.png]\n\n[Image: https://img.examtopics.com/ai-102/image6.png]\n\n[Image: https://img.examtopics.com/ai-102/image7.png]\n\n\n\n\n[Image: https://img.examtopics.com/ai-102/image5.png]\n\n[Image: https://img.examtopics.com/ai-102/image6.png]\n\n[Image: https://img.examtopics.com/ai-102/image7.png]\n\n\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image5.png]\n\n[Image: https://img.examtopics.com/ai-102/image6.png]\n\n[Image: https://img.examtopics.com/ai-102/image7.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 102,
    "images": [
      "https://img.examtopics.com/ai-102/image26.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou need to analyze video content to identify any mentions of specific company names.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image26.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 104,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Content Moderator Image Moderation",
      "Custom Vision image classification",
      "Computer Vision Image Analysis",
      "Custom Translator"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You plan to build an app that will generate a list of tags for uploaded images. The app must meet the following requirements:\n\n• Generate tags in a user's preferred language.\n• Support English, French, and Spanish.\n• Minimize development effort.\n\nYou need to build a function that will generate the tags for the app.\n\nWhich Azure service endpoint should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 105,
    "images": [
      "https://img.examtopics.com/ai-102/image28.png",
      "https://img.examtopics.com/ai-102/image29.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou develop a test method to verify the results retrieved from a call to the Computer Vision API. The call is used to analyze the existence of company logos in images. The call returns a collection of brands named brands.\n\nYou have the following code segment.\n\n\n[Image: https://img.examtopics.com/ai-102/image28.png]\n\n[Image: https://img.examtopics.com/ai-102/image29.png]\n\n\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image28.png]\n\n[Image: https://img.examtopics.com/ai-102/image29.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 106,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0008300001.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou have a Computer Vision resource named contoso1 that is hosted in the West US Azure region.\nYou need to use contoso1 to make a different size of a product photo by using the smart cropping feature.\nHow should you complete the API URL? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008300001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 107,
    "images": [
      "https://img.examtopics.com/ai-102/image31.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou have a factory that produces cardboard packaging for food products. The factory has intermittent internet connectivity.\n\nThe packages are required to include four samples of each product.\n\nYou need to build a Custom Vision model that will identify defects in packaging and provide the location of the defects to an operator. The model must ensure that each package contains the four products.\n\nWhich project type and domain should you use? To answer, drag the appropriate options to the correct targets. Each option may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image31.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 108,
    "images": [
      "https://img.examtopics.com/ai-102/image49.png",
      "https://img.examtopics.com/ai-102/image50.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building a model to detect objects in images.\n\nThe performance of the model based on training data is shown in the following exhibit.\n\n\n[Image: https://img.examtopics.com/ai-102/image49.png]\n\n[Image: https://img.examtopics.com/ai-102/image50.png]\n\n\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image49.png]\n\n[Image: https://img.examtopics.com/ai-102/image50.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 109,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Computer Vision Image Analysis",
      "the Read API in Computer Vision",
      "Form Recognizer",
      "Azure Cognitive Service for Language"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You are building an app that will include one million scanned magazine articles. Each article will be stored as an image file.\n\nYou need to configure the app to extract text from the images. The solution must minimize development effort.\n\nWhat should you include in the solution?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 110,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Upload File1.avi to an Azure Storage queue.",
      "Upload File1.avi to the Azure Video Indexer website.",
      "Upload File1.avi to Microsoft OneDrive.",
      "Upload File1.avi to the www.youtube.com webpage."
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have a 20-GB video file named File1.avi that is stored on a local drive.\n\nYou need to index File1.avi by using the Azure Video Indexer website.\n\nWhat should you do first?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 111,
    "images": [
      "https://img.examtopics.com/ai-102/image95.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building an app that will share user images.\n\nYou need to configure the app to meet the following requirements:\n\n• Uploaded images must be scanned and any text must be extracted from the images.\n• Extracted text must be analyzed for the presence of profane language.\n• The solution must minimize development effort.\n\nWhat should you use for each requirement? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image95.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 112,
    "images": [],
    "explanation": "CD",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "object detection in Azure AI Computer Vision",
      "content tags in Azure AI Computer Vision",
      "image descriptions in Azure AI Computer Vision",
      "image type detection in Azure AI Computer Vision",
      "image classification in Azure AI Custom Vision"
    ],
    "correct": [
      2,
      3
    ],
    "multiple": true,
    "text": "You are building an app that will share user images.\n\nYou need to configure the app to perform the following actions when a user uploads an image:\n\n• Categorize the image as either a photograph or a drawing.\n• Generate a caption for the image.\n\nThe solution must minimize development effort.\n\nWhich two services should you include in the solution? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 113,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "XML",
      "TXT",
      "XLS",
      "PDF"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You are building an app that will use the Azure AI Video Indexer service.\n\nYou plan to train a language model to recognize industry-specific terms.\n\nYou need to upload a file that contains the industry-specific terms.\n\nWhich file format should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 114,
    "images": [
      "https://img.examtopics.com/ai-102/image117.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\n\nYou have an app that uses Azure AI and a custom trained classifier to identify products in images.\n\nYou need to add new products to the classifier. The solution must meet the following requirements:\n\n• Minimize how long it takes to add the products.\n• Minimize development effort.\n\nWhich five actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image117.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 115,
    "images": [
      "https://img.examtopics.com/ai-102/image119.png",
      "https://img.examtopics.com/ai-102/image120.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are developing an application that will use the Azure AI Vision client library. The application has the following code.\n\n\n[Image: https://img.examtopics.com/ai-102/image119.png]\n\n[Image: https://img.examtopics.com/ai-102/image120.png]\n\n\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image119.png]\n\n[Image: https://img.examtopics.com/ai-102/image120.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 116,
    "images": [
      "https://img.examtopics.com/ai-102/image151.png"
    ],
    "explanation": "BD",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Remove the operation_id parameter.",
      "Add code to verify the read_results.status value.",
      "Add code to verify the status of the read_operation_location value.",
      "Wrap the call to get_read_result within a loop that contains a delay."
    ],
    "correct": [
      1,
      3
    ],
    "multiple": true,
    "text": "You are developing a method that uses the Azure AI Vision client library. The method will perform optical character recognition (OCR) in images. The method has the following code.\n\n\n[Image: https://img.examtopics.com/ai-102/image151.png]\n\n\n\nDuring testing, you discover that the call to the get_read_result method occurs before the read operation is complete.\n\nYou need to prevent the get_read_result method from proceeding until the read operation is complete.\n\nWhich two actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 118,
    "images": [
      "https://img.examtopics.com/ai-102/image152.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are developing an app that will use the Azure AI Vision API to analyze an image.\n\nYou need configure the request that will be used by the app to identify whether an image is clipart or a line drawing.\n\nHow should you complete the request? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image152.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 120,
    "images": [
      "https://img.examtopics.com/ai-102/image171.png"
    ],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "File1 and File3 only",
      "File1, File2, File3 and File4",
      "File1, File2, and File3 only",
      "File1 and File2 only",
      "File1, File2, and File4 only"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have a local folder that contains the files shown in the following table.\n\n\n[Image: https://img.examtopics.com/ai-102/image171.png]\n\n\n\nYou need to analyze the files by using Azure AI Video Indexer.\n\nWhich files can you upload to the Video Indexer website?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 121,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0008600001.jpg"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou train a Custom Vision model to identify a company's products by using the Retail domain.\nYou plan to deploy the model as part of an app for Android phones.\nYou need to prepare the model for deployment.\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008600001.jpg]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 122,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0008700001.png",
      "https://www.examtopics.com/assets/media/exam-media/04271/0008700002.png"
    ],
    "explanation": "Reference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/face/face-api-how-to-topics/use-persondirectory",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are developing an application to recognize employees' faces by using the Face Recognition API. Images of the faces will be accessible from a URI endpoint.\nThe application has the following code.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008700001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008700002.png]\n\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008700001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008700002.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 123,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0008900001.png"
    ],
    "explanation": "Reference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/copy-move-projects",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou have a Custom Vision resource named acvdev in a development environment.\nYou have a Custom Vision resource named acvprod in a production environment.\nIn acvdev, you build an object detection model named obj1 in a project named proj1.\nYou need to move obj1 to acvprod.\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008900001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 124,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0009000001.jpg"
    ],
    "explanation": "Step 1: Create a project -\nCreate a new project.\nStep 2: Upload and tag the images\nChoose training images. Then upload and tag the images.\nStep 3: Train the classifier model.\n\nTrain the classifier -\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/getting-started-build-a-classifier",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou are developing an application that will recognize faults in components produced on a factory production line. The components are specific to your business.\nYou need to use the Custom Vision API to help detect common faults.\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0009000001.jpg]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "computer-vision",
    "questionId": 125,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0009300001.jpg"
    ],
    "explanation": "Box 1: Classification -\nIncorrect Answers:\nAn object detection project is for detecting which objects, if any, from a set of candidates are present in an image.\n\nBox 2: Multiclass -\nA multiclass classification project is for classifying images into a set of tags, or target labels. An image can be assigned to one tag only.\nIncorrect Answers:\nA multilabel classification project is similar, but each image can have multiple tags assigned to it.\n\nBox 3: General -\nGeneral: Optimized for a broad range of image classification tasks. If none of the other specific domains are appropriate, or if you're unsure of which domain to choose, select one of the General domains.\nReference:\nhttps://cran.r-project.org/web/packages/AzureVision/vignettes/customvision.html",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are building a model that will be used in an iOS app.\nYou have images of cats and dogs. Each image contains either a cat or a dog.\nYou need to use the Custom Vision service to detect whether the images is of a cat or a dog.\nHow should you configure the project in the Custom Vision portal? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0009300001.jpg]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "computer-vision",
    "questionId": 136,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou develop an application to identify species of flowers by training a Custom Vision model.\nYou receive images of new flower species.\nYou need to add the new images to the classifier.\nSolution: You add the new images, and then use the Smart Labeler tool.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "computer-vision",
    "questionId": 146,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou develop an application to identify species of flowers by training a Custom Vision model.\nYou receive images of new flower species.\nYou need to add the new images to the classifier.\nSolution: You add the new images and labels to the existing model. You retrain the model, and then publish the model.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "computer-vision",
    "questionId": 157,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou develop an application to identify species of flowers by training a Custom Vision model.\nYou receive images of new flower species.\nYou need to add the new images to the classifier.\nSolution: You create a new model, and then upload the new images and labels.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "computer-vision",
    "questionId": 178,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0013400001.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou train a Custom Vision model used in a mobile app.\nYou receive 1,000 new images that do not have any associated data.\nYou need to use the images to retrain the model. The solution must minimize how long it takes to retrain the model.\nWhich three actions should you perform in the Custom Vision portal? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0013400001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 238,
    "images": [],
    "explanation": "CE",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "botId",
      "tenantId",
      "appId",
      "objectId",
      "appSecret"
    ],
    "correct": [
      2,
      4
    ],
    "multiple": true,
    "text": "You build a bot by using the Microsoft Bot Framework SDK and the Azure Bot Service.\nYou plan to deploy the bot to Azure.\nYou register the bot by using the Bot Channels Registration service.\nWhich two values are required to complete the deployment? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 239,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0023500001.png"
    ],
    "explanation": "Box 1: Yes -\nYou create property accessors using the CreateProperty method that provides a handle to the BotState object. Each state property accessor allows you to get or set the value of the associated state property.\n\nBox 2: Yes -\n\nBox 3: No -\nBefore you exit the turn handler, you use the state management objects' SaveChangesAsync() method to write all state changes back to storage.\nReference:\nhttps://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-v4-state",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are building a chatbot by using the Microsoft Bot Framework SDK.\nYou use an object named UserProfile to store user profile information and an object named ConversationData to store information related to a conversation.\nYou create the following state accessors to store both objects in state. var userStateAccessors = _userState.CreateProperty<UserProfile>(nameof(UserProfile)); var conversationStateAccessors = _conversationState.CreateProperty<ConversationData>(nameof(ConversationData));\nThe state storage mechanism is set to Memory Storage.\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0023500001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 240,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0023700001.png",
      "https://www.examtopics.com/assets/media/exam-media/04271/0023800001.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are building a chatbot that will provide information to users as shown in the following exhibit.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0023700001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0023800001.png]\n\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0023700001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0023800001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 242,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0024300001.png"
    ],
    "explanation": "Reference:\nhttps://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-add-media-attachments?view=azure-bot-service-4.0&tabs=csharp",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are designing a conversation flow to be used in a chatbot.\nYou need to test the conversation flow by using the Microsoft Bot Framework Emulator.\nHow should you complete the .chat file? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0024300001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 243,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0024500001.png"
    ],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "dialog",
      "user",
      "turn",
      "conversation"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are building a chatbot by using the Microsoft Bot Framework Composer as shown in the exhibit. (Click the Exhibit tab.)\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0024500001.png]\n\n\nThe chatbot contains a dialog named GetUserDetails. GetUserDetails contains a TextInput control that prompts users for their name.\nThe user input will be stored in a property named name.\nYou need to ensure that you can dispose of the property when the last active dialog ends.\nWhich scope should you assign to name?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 245,
    "images": [],
    "explanation": "ABC",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Enable WebSockets for the chatbot app.",
      "Create a Speech service.",
      "Register a Direct Line Speech channel.",
      "Register a Cortana channel.",
      "Enable CORS for the chatbot app.",
      "Create a Language Understanding service."
    ],
    "correct": [
      0,
      1,
      2
    ],
    "multiple": true,
    "text": "You need to enable speech capabilities for a chatbot.\nWhich three actions should you perform? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 246,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "a language generator",
      "a custom event",
      "a dialog trigger",
      "a conversation activity"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You use the Microsoft Bot Framework Composer to build a chatbot that enables users to purchase items.\nYou need to ensure that the users can cancel in-progress transactions. The solution must minimize development effort.\nWhat should you add to the bot?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 249,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0022200001.jpg",
      "https://www.examtopics.com/assets/media/exam-media/04271/0022300001.png"
    ],
    "explanation": "Box 1: No -\nUser.name is a property.\n\nBox 2: Yes -\n\nBox 3: Yes -\nThe coalesce() function evaluates a list of expressions and returns the first non-null (or non-empty for string) expression.\nReference:\nhttps://docs.microsoft.com/en-us/composer/concept-language-generation https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/coalescefunction",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are building a chatbot by using the Microsoft Bot Framework Composer.\nYou have the dialog design shown in the following exhibit.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0022200001.jpg]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0022300001.png]\n\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0022200001.jpg]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0022300001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 251,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "adaptive",
      "skill",
      "waterfall",
      "component"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You are designing a conversational interface for an app that will be used to make vacation requests. The interface must gather the following data:\n\n• The start date of a vacation\n• The end date of a vacation\n• The amount of required paid time off\n\nThe solution must minimize dialog complexity.\n\nWhich type of dialog should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 252,
    "images": [
      "https://img.examtopics.com/ai-102/image19.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou build a bot by using the Microsoft Bot Framework SDK.\n\nYou need to test the bot interactively on a local machine.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\nNOTE: More than one order of answer choices is correct. You will receive credit for any of the correct orders you select.\n\n\n[Image: https://img.examtopics.com/ai-102/image19.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 253,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "a dialog",
      "an activity handler",
      "an adaptive card",
      "a skill"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You create a bot by using the Microsoft Bot Framework SDK.\n\nYou need to configure the bot to respond to events by using custom text responses.\n\nWhat should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 254,
    "images": [
      "https://img.examtopics.com/ai-102/image21.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou build a bot named app1 by using the Microsoft Bot Framework.\n\nYou prepare app1 for deployment.\n\nYou need to deploy app1 to Azure.\n\nHow should you complete the command? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image21.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 258,
    "images": [],
    "explanation": "BCF",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Create a composer extension.",
      "Change the Recognizer/Dispatch type.",
      "Create an Orchestrator model.",
      "Enable WebSockets.",
      "Create a custom recognizer JSON file.",
      "Install the Orchestrator package."
    ],
    "correct": [
      1,
      2,
      5
    ],
    "multiple": true,
    "text": "You create five bots by using Microsoft Bot Framework Composer.\n\nYou need to make a single bot available to users that combines the bots. The solution must support dynamic routing to the bots based on user input.\n\nWhich three actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 259,
    "images": [],
    "explanation": "BD",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Linked entities from a well-known knowledge base",
      "Sentiment Analysis",
      "Key Phrases",
      "Detect Language",
      "Named Entity Recognition"
    ],
    "correct": [
      1,
      3
    ],
    "multiple": true,
    "text": "You are building a multilingual chatbot.\nYou need to send a different answer for positive and negative messages.\nWhich two Language service APIs should you use? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 264,
    "images": [],
    "explanation": "DE",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "an entity",
      "an Azure function",
      "an utterance",
      "an adaptive card",
      "a dialog"
    ],
    "correct": [
      3,
      4
    ],
    "multiple": true,
    "text": "You are building a chatbot by using Microsoft Bot Framework Composer.\n\nYou need to configure the chatbot to present a list of available options. The solution must ensure that an image is provided for each option.\n\nWhich two features should you use? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 265,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "component",
      "action",
      "waterfall",
      "adaptive"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You are building a chatbot.\n\nYou need to configure the bot to guide users through a product setup process.\n\nWhich type of dialog should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 266,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Cortana",
      "Microsoft Teams",
      "Direct Line Speech"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have a chatbot that was built by using Microsoft Bot Framework and deployed to Azure.\n\nYou need to configure the bot to support voice interactions. The solution must support multiple client apps.\n\nWhich type of channel should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 267,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Deploy the bot to Azure and register the bot with a Direct Line Speech channel.",
      "Integrate the bot with Cortana by using the Bot Framework SDK.",
      "Create an Azure function that will call the Speech service and connect the bot to the function.",
      "Deploy the bot to Azure and register the bot with a Microsoft Teams channel."
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are building a bot by using Microsoft Bot Framework.\n\nYou need to configure the bot to respond to spoken requests. The solution must minimize development effort.\n\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 269,
    "images": [
      "https://img.examtopics.com/ai-102/image43.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building a chatbot.\n\nYou need to use the Content Moderator service to identify messages that contain sexually explicit language.\n\nWhich section in the response from the service will contain the category score, and which category will be assigned to the message? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image43.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 271,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "prompt",
      "input",
      "adaptive",
      "QnA Maker"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are building a chatbot for a travel agent. The bot will ask users for a destination and must repeat the question until a valid input is received, or the user closes the conversation.\n\nWhich type of dialog should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 272,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "QnAMakerDialog",
      "AdaptiveDialog",
      "SkillDialog",
      "ComponentDialog"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are building a chatbot.\n\nYou need to configure the chatbot to query a knowledge base.\n\nWhich dialog class should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 273,
    "images": [
      "https://img.examtopics.com/ai-102/image63.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have a chatbot.\n\nYou need to ensure that the bot conversation resets if a user fails to respond for 10 minutes.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image63.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 275,
    "images": [],
    "explanation": "ABE",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Configure the language and voice settings for the Speech resource.",
      "Add the endpoint and key of the Speech resource to the bot.",
      "Add language understanding to dialogs.",
      "Add Orchestrator to the bot.",
      "Add Speech to the bot responses.",
      "Remove the setSpeak configuration."
    ],
    "correct": [
      0,
      1,
      4
    ],
    "multiple": true,
    "text": "You have a Speech resource and a bot that was built by using the Microsoft Bot Framework Composer.\n\nYou need to add support for speech-based channels to the bot.\n\nWhich three actions should you perform? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 276,
    "images": [
      "https://img.examtopics.com/ai-102/image65.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou are building a bot.\n\nYou need to test the bot in the Bot Framework Emulator. The solution must ensure that you can debug the bot interactively.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image65.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 277,
    "images": [
      "https://img.examtopics.com/ai-102/image67.png",
      "https://img.examtopics.com/ai-102/image68.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have a bot that was built by using the Microsoft Bot Framework composer as shown in the following exhibit.\n\n\n[Image: https://img.examtopics.com/ai-102/image67.png]\n\n[Image: https://img.examtopics.com/ai-102/image68.png]\n\n\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image67.png]\n\n[Image: https://img.examtopics.com/ai-102/image68.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 278,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "prompt",
      "adaptive",
      "waterfall",
      "action"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are building a flight booking bot by using the Microsoft Bot Framework SDK.\n\nThe bot will ask users for the departure date. The bot must repeat the question until a valid date is given, or the users cancel the transaction.\n\nWhich type of dialog should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 279,
    "images": [
      "https://img.examtopics.com/ai-102/image70.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have a chatbot.\n\nYou need to test the bot by using the Bot Framework Emulator. The solution must ensure that you are prompted for credentials when you sign in to the bot.\n\nWhich three settings should you configure? To answer, select the appropriate settings in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image70.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 281,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "only an app registration in Microsoft Azure Active Directory (Azure AD), part of Microsoft Entra, an Azure App Service instance, and an App Service plan",
      "only an app registration in Microsoft Azure Active Directory (Azure AD), part of Microsoft Entra, an Azure Kubernetes Service (AKS) instance, and a container image",
      "only an Azure App Service instance, and an App Service plan",
      "only an Azure Machine Learning workspace and an app registration in Microsoft Azure Active Directory (Azure AD), part of Microsoft Entra"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You build a bot.\n\nYou create an Azure Bot resource.\n\nYou need to deploy the bot to Azure.\n\nWhat else should you create?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 282,
    "images": [],
    "explanation": "CD",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "adaptive",
      "action",
      "waterfall",
      "prompt",
      "input"
    ],
    "correct": [
      2,
      3
    ],
    "multiple": true,
    "text": "You are building a chatbot by using the Microsoft Bot Framework SDK. The bot will be used to accept food orders from customers and allow the customers to customize each food item.\n\nYou need to configure the bot to ask the user for additional input based on the type of item ordered. The solution must minimize development effort.\n\nWhich two types of dialogs should you use? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 284,
    "images": [
      "https://img.examtopics.com/ai-102/image86.png",
      "https://img.examtopics.com/ai-102/image87.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou are building a chatbot by using the Microsoft Bot Framework SDK.\n\nYou use an object named UserProfile to store user profile information and an object named ConversationData to store information related to a conversation.\n\nYou create the following state accessors to store both objects in state.\n\n\n[Image: https://img.examtopics.com/ai-102/image86.png]\n\n[Image: https://img.examtopics.com/ai-102/image87.png]\n\n\n\nThe state storage mechanism is set to Memory Storage.\n\nFor each of the following statements, select Yes if the statement is true. Otherwise select No.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image86.png]\n\n[Image: https://img.examtopics.com/ai-102/image87.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 287,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0023100001.jpg",
      "https://www.examtopics.com/assets/media/exam-media/04271/0023100002.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are building a chatbot for a Microsoft Teams channel by using the Microsoft Bot Framework SDK. The chatbot will use the following code.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0023100001.jpg]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0023100002.png]\n\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0023100001.jpg]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0023100002.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "computer-vision",
    "questionId": 288,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0023300001.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are reviewing the design of a chatbot. The chatbot includes a language generation file that contains the following fragment.\n# Greet(user)\n- ${Greeting()}, ${user.name}\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0023300001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "6",
    "domainId": "computer-vision",
    "questionId": 289,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0007100001.jpg"
    ],
    "explanation": "Box 1: Azure Blob storage -\nAt the start of the pipeline, you have unstructured text or non-text content (such as images, scanned documents, or JPEG files). Data must exist in an Azure data storage service that can be accessed by an indexer.\n\nBox 2: Computer Vision API -\nScenario: Provide users with the ability to search insight gained from the images, manuals, and videos associated with the products.\nThe Computer Vision Read API is Azure's latest OCR technology (learn what's new) that extracts printed text (in several languages), handwritten text (English only), digits, and currency symbols from images and multi-page PDF documents.\n\nBox 3: Translator API -\nScenario: Product descriptions, transcripts, and alt text must be available in English, Spanish, and Portuguese.\n\nBox 4: Azure Files -\nScenario: Store all raw insight data that was generated, so the data can be processed later.\nIncorrect Answers:\nThe custom vision API from Microsoft Azure learns to recognize specific content in imagery and becomes smarter with training and time.\nReference:\nhttps://docs.microsoft.com/en-us/azure/search/cognitive-search-concept-intro https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/overview-ocr",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou are developing the smart e-commerce project.\nYou need to design the skillset to include the contents of PDFs in searches.\nHow should you complete the skillset design diagram? To answer, drag the appropriate services to the correct stages. Each service may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\nNOTE: Each correct selection is worth one point.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0007100001.jpg]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 1,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0000200001.png"
    ],
    "explanation": "Box 1: AddPhraseListAsync -\n\nExample: Add phraselist feature -\nvar phraselistId = await client.Features.AddPhraseListAsync(appId, versionId, new PhraselistCreateObject\n{\nEnabledForAllModels = false,\nIsExchangeable = true,\nName = \"QuantityPhraselist\",\nPhrases = \"few,more,extra\"\n});\n\nBox 2: PhraselistCreateObject -\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/luis/client-libraries-rest-api",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou have 100 chatbots that each has its own Language Understanding model.\nFrequently, you must add the same phrases to each model.\nYou need to programmatically update the Language Understanding models to include the new phrases.\nHow should you complete the code? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all.\nYou may need to drag the split bar between panes or scroll to view content.\nNOTE: Each correct selection is worth one point.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0000200001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 10,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0002300001.png"
    ],
    "explanation": "Reference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/how-to-use-codec-compressed-audio-input-streams?tabs=debian&pivots=programming- language-csharp",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are developing a streaming Speech to Text solution that will use the Speech SDK and MP3 encoding.\nYou need to develop a method to convert speech to text for streaming MP3 data.\nHow should you complete the code? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0002300001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 12,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0000300001.png",
      "https://www.examtopics.com/assets/media/exam-media/04271/0000400001.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou plan to use a Language Understanding application named app1 that is deployed to a container.\nApp1 was developed by using a Language Understanding authoring resource named lu1.\nApp1 has the versions shown in the following table.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0000300001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0000400001.png]\n\n\nYou need to create a container that uses the latest deployable version of app1.\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0000300001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0000400001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 13,
    "images": [],
    "explanation": "DE",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Language Understanding",
      "Azure SQL Database",
      "Azure Storage",
      "Azure Cognitive Search",
      "Azure App Service"
    ],
    "correct": [
      3,
      4
    ],
    "multiple": true,
    "text": "You plan to provision a QnA Maker service in a new resource group named RG1.\nIn RG1, you create an App Service plan named AP1.\nWhich two Azure resources are automatically created in RG1 when you provision the QnA Maker service? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 14,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "a conditional access policy in Azure Active Directory (Azure AD)",
      "the Access control (IAM) page for the authoring resources in the Azure portal",
      "the Access control (IAM) page for the prediction resources in the Azure portal"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You are building a language model by using a Language Understanding (classic) service.\nYou create a new Language Understanding (classic) resource.\nYou need to add more contributors.\nWhat should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 23,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "QnA Maker, Language Understanding, and Dispatch",
      "Translator, Speech, and Dispatch",
      "Language Understanding, Text Analytics, and QnA Maker",
      "Text Analytics, Translator, and Dispatch"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You need to build a chatbot that meets the following requirements:\n✑ Supports chit-chat, knowledge base, and multilingual models\n✑ Performs sentiment analysis on user messages\n✑ Selects the best language model automatically\nWhat should you integrate into the chatbot?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 27,
    "images": [],
    "explanation": "Step 1: Sign in to the QnA portal.\nStep 2: Create an Azure Cognitive multi-service resource:\n\nStep 3: On the Create page, provide the following information.\n\nName: Text12345678 -\n\nStep 4: Configure additional settings for your resource as needed, read and accept the conditions (as applicable), and then select Review + create.\nStep 5: Navigate to the Azure portal. Then locate and select The Text Analytics service resource Text12345678 (which you created in Step 4).\nStep 6: Next, from the left-hand navigation menu, locate Monitoring and select Diagnostic settings. This screen contains all previously created diagnostic settings for this resource.\nStep 7: Select + Add diagnostic setting.\nStep 8: When prompted to configure, select the storage account and OMS workspace that you'd like to use to store you diagnostic logs. Note: If you don't have a storage account or OMS workspace, follow the prompts to create one.\nStep 9: Select Audit, RequestResponse, and AllMetrics. Then set the retention period for your diagnostic log data. If a retention policy is set to zero, events for that log category are stored indefinitely.\nStep 10: Click Save.\nIt can take up to two hours before logging data is available to query and analyze. So don't worry if you don't see anything right away.\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account https://docs.microsoft.com/en-us/azure/cognitive-services/diagnostic-logging",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nYou need to create a Text Analytics service named Text12345678, and then enable logging for Text12345678. The solution must ensure that any changes to\nText12345678 will be stored in a Log Analytics workspace.\nTo complete this task, sign in to the Azure portal.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 28,
    "images": [],
    "explanation": "Part 1: Create a search service search12345678\nStep 1: Sign in to the QnA portal.\nStep 2: Create an Azure Cognitive multi-service resource:\n\nStep 3: On the Create page, provide the following information.\n\nName: search12345678 -\n\n\nStep 4: Click Review + create -\nPart 2: Start the Import data wizard and create a data source\nStep 5: Click Import data on the command bar to create and populate a search index.\n\nStep 6: In the wizard, click Connect to your data > Samples > hotels-sample. This data source is built-in. If you were creating your own data source, you would need to specify a name, type, and connection information. Once created, it becomes an \"existing data source\" that can be reused in other import operations.\n\nStep 7: Continue to the next page.\nStep 8: Skip the \"Enrich content\" page\nStep 9: Configure index.\nMake sure English is selected for the fields.\n\nStep 10: Continue and finish the wizard.\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/cognitive-services-apis-create-account https://docs.microsoft.com/en-us/azure/search/search-get-started-portal",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nYou need to create a search service named search12345678 that will index a sample Azure Cosmos DB database named hotels-sample. The solution must ensure that only English language fields are retrievable.\nTo complete this task, sign in to the Azure portal.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 29,
    "images": [],
    "explanation": "Part 1: Create a search service captions12345678\nStep 1: Sign in to the QnA portal.\nStep 2: Create an Azure Cognitive multi-service resource:\n\nStep 3: On the Create page, provide the following information.\nName: captions12345678ֲ¨\n\nPricing tier: Free -\n\n\nStep 4: Click Review + create -\n(Step 5: Create a data source\nIn Connect to your data, choose Azure Blob Storage. Choose an existing connection to the storage account and container you created. Give the data source a name, and use default values for the rest.)\n\nReference:\nhttps://docs.microsoft.com/en-us/azure/search/search-create-service-portal https://docs.microsoft.com/en-us/azure/search/cognitive-search-quickstart-ocr",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nYou plan to create a solution to generate captions for images that will be read from Azure Blob Storage.\nYou need to create a service in Azure Cognitive Services for the solution. The service must be named captions12345678 and must use the Free pricing tier.\nTo complete this task, sign in to the Azure portal.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 45,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0000900001.png"
    ],
    "explanation": "Box 1: PUT -\nSample Request: PUT https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/\nMicrosoft.DeviceUpdate/accounts/contoso?api-version=2020-03-01-preview\nIncorrect Answers:\nPATCH is for updates.\n\nBox 2: CognitiveServices -\nMicrosoft Azure Cognitive Services provide us to use its pre-trained models for various Business Problems related to Machine Learning.\nList of Different Services are:\n✑ Decision\n✑ Language (includes sentiment analysis)\n✑ Speech\n✑ Vision (includes OCR)\n✑ Web Search\nReference:\nhttps://docs.microsoft.com/en-us/rest/api/deviceupdate/resourcemanager/accounts/create https://www.analyticsvidhya.com/blog/2020/12/microsoft-azure-cognitive-services-api-for-ai-development/",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou need to create a new resource that will be used to perform sentiment analysis and optical character recognition (OCR). The solution must meet the following requirements:\n✑ Use a single key and endpoint to access multiple services.\n✑ Consolidate billing for future services that you might use.\n✑ Support the use of Computer Vision in the future.\nHow should you complete the HTTP request to create the new resource? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0000900001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 51,
    "images": [
      "https://img.examtopics.com/ai-102/image47.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription that has the following configurations:\n\n• Subscription ID: 8d3591aa-96b8-4737-ad09-00f9b1ed35ad\n• Tenant ID: 3edfe572-cb54-3ced-ae12-c5c177f39a12\n\nYou plan to create a resource that will perform sentiment analysis and optical character recognition (OCR).\n\nYou need to use an HTTP request to create the resource in the subscription. The solution must use a single key and endpoint.\n\nHow should you complete the request? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image47.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 55,
    "images": [
      "https://img.examtopics.com/ai-102/image91.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\n\nYou have an app that manages feedback.\n\nYou need to ensure that the app can detect negative comments by using the Sentiment Analysis API in Azure AI Language. The solution must ensure that the managed feedback remains on your company’s internal network.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\nNOTE: More than one order of answer choices is correct. You will receive credit for any of the correct orders you select.\n\n\n[Image: https://img.examtopics.com/ai-102/image91.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 62,
    "images": [
      "https://img.examtopics.com/ai-102/image115.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou plan to deploy a containerized version of an Azure Cognitive Services service that will be used for sentiment analysis.\n\nYou configure https://contoso.cognitiveservices.azure.com as the endpoint URI for the service.\n\nYou need to run the container on an Azure virtual machine by using Docker.\n\nHow should you complete the command? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image115.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "nlp",
    "questionId": 70,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0001400001.png"
    ],
    "explanation": "Box 1: mcr.microsoft.com/azure-cognitive-services/textanalytics/sentiment\nTo run the Sentiment Analysis v3 container, execute the following docker run command. docker run --rm -it -p 5000:5000 --memory 8g --cpus 1 \\ mcr.microsoft.com/azure-cognitive-services/textanalytics/sentiment \\\nEula=accept \\\nBilling={ENDPOINT_URI} \\\nApiKey={API_KEY} is the endpoint for accessing the Text Analytics API. https://<your-custom-subdomain>.cognitiveservices.azure.com\nBox 2: https://contoso.cognitiveservices.azure.com\n{ENDPOINT_URI} is the endpoint for accessing the Text Analytics API: https://<your-custom-subdomain>.cognitiveservices.a The endpoint for accessing the Text\n\nAnalytics API. zure.com -\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-install-containers?tabs=sentiment",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou plan to deploy a containerized version of an Azure Cognitive Services service that will be used for text analysis.\nYou configure https://contoso.cognitiveservices.azure.com as the endpoint URI for the service, and you pull the latest version of the Text Analytics\nSentiment Analysis container.\nYou need to run the container on an Azure virtual machine by using Docker.\nHow should you complete the command? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0001400001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "11",
    "domainId": "nlp",
    "questionId": 74,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0018000001.png"
    ],
    "explanation": "Box 1: api.cognitive.microsofttranslator.com\nTranslator 3.0: Translate. Send a POST request to:\nhttps://api.cognitive.microsofttranslator.com/translate?api-version=3.0\n\nBox 2: /translate -\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are planning the product creation project.\nYou need to build the REST endpoint to create the multilingual product descriptions.\nHow should you complete the URI? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0018000001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "14",
    "domainId": "nlp",
    "questionId": 77,
    "images": [],
    "explanation": "BC",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "/vision/v3.1/read/analyzeResults",
      "/formrecognizer/v2.0/custom/models/{modelId}/analyze",
      "/formrecognizer/v2.0/prebuilt/receipt/analyze",
      "/vision/v3.1/describe",
      "/vision/v3.1/read/analyze"
    ],
    "correct": [
      1,
      2
    ],
    "multiple": true,
    "text": "You are developing the document processing workflow.\nYou need to identify which API endpoints to use to extract text from the financial documents. The solution must meet the document processing requirements.\nWhich two API endpoints should you identify? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "15",
    "domainId": "nlp",
    "questionId": 82,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0027300001.png"
    ],
    "explanation": "Box 1: QnA Maker Editor -\nScenario: Provide all employees with the ability to edit Q&As.\nThe QnA Maker Editor (read/write) has the following permissions:\n✑ Create KB API\n✑ Update KB API\n✑ Replace KB API\n✑ Replace Alterations\n✑ \"Train API\" [in new service model v5]\n\nBox 2: Contributor -\nScenario: Only senior managers must be able to publish updates.\nContributor permission: All except ability to add new members to roles\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/reference-role-based-access-control",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are developing the shopping on-the-go project.\nYou are configuring access to the QnA Maker (classic) resources.\nWhich role should you assign to AllUsers and LeadershipTeam? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0027300001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 126,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou build a language model by using a Language Understanding service. The language model is used to search for information on a contact list by using an intent named FindContact.\nA conversational expert provides you with the following list of phrases to use for training.\n✑ Find contacts in London.\n✑ Who do I know in Seattle?\n✑ Search for contacts in Ukraine.\nYou need to implement the phrase list in Language Understanding.\nSolution: You create a new pattern in the FindContact intent.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 127,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Add show-all-intents=true to the prediction endpoint query.",
      "Enable speech priming.",
      "Add log=true to the prediction endpoint query.",
      "Enable sentiment analysis."
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You are building a conversational language understanding model.\nYou need to enable active learning.\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 128,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0013900001.png",
      "https://www.examtopics.com/assets/media/exam-media/04271/0014000001.jpg"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou run the following command.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0013900001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0014000001.jpg]\n\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0013900001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0014000001.jpg]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 129,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "machine learned",
      "Regex",
      "geographyV2",
      "Pattern.any",
      "list"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are building a Language Understanding model for an e-commerce platform.\nYou need to construct an entity to capture billing addresses.\nWhich entity type should you use for the billing address?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 130,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Combine the speech samples into a single audio file in the .wma format and upload the file.",
      "Upload a .zip file that contains a collection of audio files in the .wav format and a corresponding text transcript file.",
      "Upload individual audio files in the FLAC format and manually upload a corresponding transcript in Microsoft Word format.",
      "Upload individual audio files in the .wma format."
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You need to upload speech samples to a Speech Studio project for use in training.\nHow should you upload the samples?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 131,
    "images": [],
    "explanation": "CDF",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "toScript=Cyrl",
      "from=el",
      "textType=html",
      "to=el",
      "textType=plain",
      "toScript=Latn"
    ],
    "correct": [
      2,
      3,
      5
    ],
    "multiple": true,
    "text": "You are developing a method for an application that uses the Translator API.\nThe method will receive the content of a webpage, and then translate the content into Greek (el). The result will also contain a transliteration that uses the Roman alphabet.\nYou need to create the URI for the call to the Translator API.\nYou have the following URI.\nhttps://api.cognitive.microsofttranslator.com/translate?api-version=3.0\nWhich three additional query parameters should you include in the URI? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 132,
    "images": [],
    "explanation": "CE",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Fiddler",
      "Bot Framework Composer",
      "Bot Framework Emulator",
      "Bot Framework CLI",
      "ngrok",
      "nginx"
    ],
    "correct": [
      2,
      4
    ],
    "multiple": true,
    "text": "You have a chatbot that was built by using the Microsoft Bot Framework.\nYou need to debug the chatbot endpoint remotely.\nWhich two tools should you install on a local computer? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 133,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0014700001.png"
    ],
    "explanation": "Step 1: Add alternative phrasing to the question and answer (QnA) pair.\nAdd alternate questions to an existing QnA pair to improve the likelihood of a match to a user query.\nStep 2: Retrain the model.\nPeriodically select Save and train after making edits to avoid losing changes.\n\nStep 3: Republish the model -\nNote: A knowledge base consists of question and answer (QnA) pairs. Each pair has one answer and a pair contains all the information associated with that answer.\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/how-to/edit-knowledge-base",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou are building a retail chatbot that will use a QnA Maker service.\nYou upload an internal support document to train the model. The document contains the following question: \"What is your warranty period?\"\nUsers report that the chatbot returns the default QnA Maker answer when they ask the following question: \"How long is the warranty coverage?\"\nThe chatbot returns the correct answer when the users ask the following question: 'What is your warranty period?\"\nBoth questions should return the same answer.\nYou need to increase the accuracy of the chatbot responses.\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0014700001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 134,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou build a language model by using a Language Understanding service. The language model is used to search for information on a contact list by using an intent named FindContact.\nA conversational expert provides you with the following list of phrases to use for training.\n✑ Find contacts in London.\n✑ Who do I know in Seattle?\n✑ Search for contacts in Ukraine.\nYou need to implement the phrase list in Language Understanding.\nSolution: You create a new intent for location.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 135,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0015000006.png"
    ],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou build a language model by using a Language Understanding service. The language model is used to search for information on a contact list by using an intent named FindContact.\nA conversational expert provides you with the following list of phrases to use for training.\n✑ Find contacts in London.\n✑ Who do I know in Seattle?\nSearch for contacts in Ukraine.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0015000006.png]\n\n\nYou need to implement the phrase list in Language Understanding.\nSolution: You create a new entity for the domain.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 137,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Enable active learning.",
      "Add a machine learned entity.",
      "Add additional examples to the GetContactDetails intent.",
      "Add examples to the None intent."
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You are training a Language Understanding model for a user support system.\nYou create the first intent named GetContactDetails and add 200 examples.\nYou need to decrease the likelihood of a false positive.\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 138,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0015300001.jpg"
    ],
    "explanation": "Box 1: GeographyV2 -\nThe prebuilt geographyV2 entity detects places. Because this entity is already trained, you do not need to add example utterances containing GeographyV2 to the application intents.\n\nBox 2: Email -\nEmail prebuilt entity for a LUIS app: Email extraction includes the entire email address from an utterance. Because this entity is already trained, you do not need to add example utterances containing email to the application intents.\n\nBox 3: Machine learned -\nThe machine-learning entity is the preferred entity for building LUIS applications.\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-reference-prebuilt-geographyv2 https://docs.microsoft.com/en-us/azure/cognitive-services/luis/luis-reference-prebuilt-email https://docs.microsoft.com/en-us/azure/cognitive-services/luis/reference-entity-machine-learned-entity",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou are building a Language Understanding model for purchasing tickets.\nYou have the following utterance for an intent named PurchaseAndSendTickets.\nPurchase [2 audit business] tickets to [Paris] [next Monday] and send tickets to [email@domain.com]\nYou need to select the entity types. The solution must use built-in entity types to minimize training data whenever possible.\nWhich entity type should you use for each label? To answer, drag the appropriate entity types to the correct labels. Each entity type may be used once, more than once, or not at all.\nYou may need to drag the split bar between panes or scroll to view content.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0015300001.jpg]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 139,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0015500001.png"
    ],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "create_resource(\"res1\", \"ContentModerator\", \"S0\", \"eastus\")",
      "create_resource(\"res1\", \"TextAnalytics\", \"S0\", \"eastus\")",
      "create_resource(\"res1\", \"ContentModerator\", \"Standard\", \"East US\")",
      "create_resource(\"res1\", \"TextAnalytics\", \"Standard\", \"East US\")"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have the following C# method.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0015500001.png]\n\n\nYou need to deploy an Azure resource to the East US Azure region. The resource will be used to perform sentiment analysis.\nHow should you call the method?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 140,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0015600001.png"
    ],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "by month",
      "chicago",
      "rain",
      "location"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You build a Conversational Language Understanding model by using the Language Services portal.\nYou export the model as a JSON file as shown in the following sample.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0015600001.png]\n\n\nTo what does the Weather.Historic entity correspond in the utterance?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 141,
    "images": [],
    "explanation": "Step 1: Open Microsoft Bot Framework Composer\nStep 2: Select the bot bot12345678\nStep 3: Select Import existing resources. Read the instructions on the right side of the screen and select Next.\n\nStep 4: Browse to the C:\\Resources\\LU folder and select the available .lu file\nStep 5: In the pop-up window Importing existing resources, modify the JSON file content based on your resources information: Name the intent TaskReminder\nStep 6: Select Publish from the Composer menu. In the Publish your bots pane, select the bot to publish (bot12345678), then select a publish profile from the\nPublish target drop-down list.\n\nReference:\nhttps://docs.microsoft.com/en-us/composer/how-to-publish-bot",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nYou need to configure and publish bot12345678 to support task management. The intent must be named TaskReminder. The LUDown for the intent is in the C:\n\\Resources\\LU folder.\nTo complete this task, use the Microsoft Bot Framework Composer.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 142,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0015700001.png"
    ],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Entity Linking",
      "Named Entity Recognition",
      "Sentiment Analysis",
      "Key Phrase Extraction"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You are examining the Text Analytics output of an application.\nThe text analyzed is: `Our tour guide took us up the Space Needle during our trip to Seattle last week.`\nThe response contains the data shown in the following table.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0015700001.png]\n\n\nWhich Text Analytics API is used to analyze the text?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 143,
    "images": [],
    "explanation": "Step 1: Open Microsoft Bot Framework Composer\nStep 2: Select the bot bot12345678\nStep 3: Select Configure.\nStep 4: Select the Azure Language Understanding tab\nStep 5: Select the Set up Language Understanding button. The Set up Language Understanding window will appear, shown below:\n\nStep 6: Select Use existing resources and then select Next at the bottom of the window.\nStep 7: Now select the Azure directory, Azure subscription, and Language Understanding resource name (French).\nStep 8: Select Next on the bottom. Your Key and Region will appear on the next on the next window, shown below:\n\n\nStep 9. Select Done -\nReference:\nhttps://docs.microsoft.com/en-us/composer/concept-language-understanding https://docs.microsoft.com/en-us/composer/how-to-add-luis",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nYou need to configure bot12345678 support the French (FR-FR) language.\nExport the bot to C:\\Resources\\Bot\\Bot1.zip.\nTo complete this task, use the Microsoft Bot Framework Composer.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 144,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Language service",
      "Content Moderator",
      "Computer Vision",
      "Form Recognizer"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You need to measure the public perception of your brand on social media by using natural language processing.\nWhich Azure service should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 145,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0016800001.png"
    ],
    "explanation": "Box 1: (\"api-nam.cognitive.microsofttranslator.com\")\nGeography USA: api-nam.cognitive.microsofttranslator.com\nDatacenters: East US, South Central US, West Central US, and West US 2\nBox 2: \"/translate?to=en\"\nMust specify the language which it is being translated to. The 'to' parameter is required\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-reference https://docs.microsoft.com/en-us/azure/cognitive-services/translator/reference/v3-0-translate",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are developing an application that includes language translation.\nThe application will translate text retrieved by using a function named get_text_to_be_translated. The text can be in one of many languages. The content of the text must remain within the Americas Azure geography.\nYou need to develop code to translate the text to a single language.\nHow should you complete the code? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0016800001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 148,
    "images": [],
    "explanation": "Create your LUIS model -\n1. You should navigate to your LUIS.ai management portal and create a new application. In the portal create a model.\n\nModel name: 1u12345678 -\n2. Define one intent as ג€Travelג€ and add an example utterances of Boat.\n\n3. Publish the model\nIn order to use your model, you have to publish it. This is as easy as hitting the Publish tab, selecting between the production or staging environments, and hitting\nPublish. As you can see from this page, you can also choose to enable sentiment analysis, speech priming to improve speech recognition, or the spell checker.\nFor now, you can leave those unchecked.\nReference:\nhttps://docs.microsoft.com/en-us/azure/health-bot/language_model_howto https://www.codemag.com/article/1809021/Natural-Language-Understanding-with-LUIS",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nUse the following login credentials as needed:\nTo enter your username, place your cursor in the Sign in box and click on the username below.\nTo enter your password, place your cursor in the Enter password box and click on the password below.\n\nAzure Username: admin@abc.com -\n\nAzure Password: XXXXXXXXXXXX -\nThe following information is for technical support purposes only:\n\nLab Instance: 12345678 -\n\nTask -\nYou need to create and publish a Language Understanding (classic) model named 1u12345678. The model will contain an intent of Travel that has an utterance of\nBoat.\nTo complete this task, sign in to the Language Understanding portal at httptc//www.luis-ai/.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 149,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "model-version",
      "piiCategories",
      "showStats",
      "loggingOptOut"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have a Language service resource that performs the following:\n\n• Sentiment analysis\n• Named Entity Recognition (NER)\n• Personally Identifiable Information (PII) identification\n\nYou need to prevent the resource from persisting input data once the data is analyzed.\n\nWhich query parameter in the Language service API should you configure?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 150,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Universal.Microsoft.CognitiveServices.Speech",
      "SpeechServicesToolkit",
      "Azure.AI.Language.Conversations",
      "Xamarin.Cognitive.Speech"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have an Azure Cognitive Services model named Model1 that identifies the intent of text input.\n\nYou develop an app in C# named App1.\n\nYou need to configure App1 to use Model1.\n\nWhich package should you add to App1?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 151,
    "images": [
      "https://img.examtopics.com/ai-102/image9.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building content for a video training solution.\n\nYou need to create narration to accompany the video content. The solution must use Custom Neural Voice.\n\nWhat should you use to create a custom neural voice, and which service should you use to generate the narration? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct answer is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image9.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 152,
    "images": [
      "https://img.examtopics.com/ai-102/image11.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building a call handling system that will receive calls from French-speaking and German-speaking callers. The system must perform the following tasks:\n\n• Capture inbound voice messages as text.\n• Replay messages in English on demand.\n\nWhich Azure Cognitive Services services should you use? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image11.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 153,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "https://uksouth.api.cognitive.microsoft.com/speechtotext/v3.0/models/base",
      "https://uksouth.customvoice.api.speech.microsoft.com/api/texttospeech/v3.0/longaudiosynthesis/voices",
      "https://uksouth.tts.speech.microsoft.com/cognitiveservices/voices/list",
      "https://uksouth.voice.speech.microsoft.com/cognitiveservices/v1?deploymentId={deploymentId}"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You are building a social media extension that will convert text to speech. The solution must meet the following requirements:\n\n• Support messages of up to 400 characters.\n• Provide users with multiple voice options.\n• Minimize costs.\n\nYou create an Azure Cognitive Services resource.\n\nWhich Speech API endpoint provides users with the available voice options?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 154,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Add follow-up prompts.",
      "Enable active learning.",
      "Add alternate questions.",
      "Enable chit-chat."
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You develop a custom question answering project in Azure Cognitive Service for Language. The project will be used by a chatbot.\n\nYou need to configure the project to engage in multi-turn conversations.\n\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 155,
    "images": [
      "https://img.examtopics.com/ai-102/image13.png",
      "https://img.examtopics.com/ai-102/image14.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou are building a solution that students will use to find references for essays.\n\nYou use the following code to start building the solution.\n\n\n[Image: https://img.examtopics.com/ai-102/image13.png]\n\n[Image: https://img.examtopics.com/ai-102/image14.png]\n\n\n\nFor each of the following statements, select Yes is the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image13.png]\n\n[Image: https://img.examtopics.com/ai-102/image14.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 156,
    "images": [],
    "explanation": "AC",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "From the language authoring REST endpoint, retrieve the model evaluation summary.",
      "From Language Studio, enable Active Learning, and then validate the utterances logged for review.",
      "From Language Studio, select Model performance.",
      "From the Azure portal, enable log collection in Log Analytics, and then analyze the logs."
    ],
    "correct": [
      0,
      2
    ],
    "multiple": true,
    "text": "You train a Conversational Language Understanding model to understand the natural language input of users.\n\nYou need to evaluate the accuracy of the model before deploying it.\n\nWhat are two methods you can use? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 158,
    "images": [
      "https://img.examtopics.com/ai-102/image33.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\n\nYou develop an app in C# named App1 that performs speech-to-speech translation.\n\nYou need to configure App1 to translate English to German.\n\nHow should you complete the SpeechTranslationConfig object? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image33.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 159,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Identity",
      "Keys and Endpoint",
      "Networking",
      "Properties"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an Azure Cognitive Service for Language resource.\n\nYou need to identify the URL of the REST interface for the Language service.\n\nWhich blade should you use in the Azure portal?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 160,
    "images": [
      "https://img.examtopics.com/ai-102/image35.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou are building a transcription service for technical podcasts.\n\nTesting reveals that the service fails to transcribe technical terms accurately.\n\nYou need to improve the accuracy of the service.\n\nWhich five actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image35.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 161,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "a .zip file that contains 10-second .wav files and the associated transcripts as .txt files",
      "a five-minute .flac audio file and the associated transcript as a .txt file",
      "a .wav or .mp3 file of the voice talent consenting to the creation of a synthetic version of their voice",
      "a five-minute .wav or .mp3 file of the voice talent describing the kiosk system"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You are building a retail kiosk system that will use a custom neural voice.\n\nYou acquire audio samples and consent from the voice talent.\n\nYou need to create a voice talent profile.\n\nWhat should you upload to the profile?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 162,
    "images": [
      "https://img.examtopics.com/ai-102/image37.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou have a Language Understanding solution that runs in a Docker container.\n\nYou download the Language Understanding container image from the Microsoft Container Registry (MCR).\n\nYou need to deploy the container image to a host computer.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image37.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 163,
    "images": [
      "https://img.examtopics.com/ai-102/image39.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building a text-to-speech app that will use a custom neural voice.\n\nYou need to create an SSML file for the app. The solution must ensure that the voice profile meets the following requirements:\n\n• Expresses a calm tone\n• Imitates the voice of a young adult female\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image39.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 164,
    "images": [],
    "explanation": "AC",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "personal data",
      "the adult classification score",
      "text classification",
      "optical character recognition (OCR)",
      "the racy classification score"
    ],
    "correct": [
      0,
      2
    ],
    "multiple": true,
    "text": "You have a text-based chatbot.\n\nYou need to enable content moderation by using the Text Moderation API of Content Moderator.\n\nWhich two service responses should you use? Each correct answer presents part of the solution.\n\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 165,
    "images": [
      "https://img.examtopics.com/ai-102/image52.png",
      "https://img.examtopics.com/ai-102/image53.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou are developing a text processing solution.\n\nYou have the function shown below.\n\n\n[Image: https://img.examtopics.com/ai-102/image52.png]\n\n[Image: https://img.examtopics.com/ai-102/image53.png]\n\n\n\nFor the second argument, you call the function and specify the following string.\n\nOur tour of Paris included a visit to the Eiffel Tower\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\n\n[Image: https://img.examtopics.com/ai-102/image52.png]\n\n[Image: https://img.examtopics.com/ai-102/image53.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 166,
    "images": [
      "https://img.examtopics.com/ai-102/image55.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building an Azure web app named App1 that will translate text from English to Spanish.\n\nYou need to use the Text Translation REST API to perform the translation. The solution must ensure that you have data sovereignty in the United States.\n\nHow should you complete the URI? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image55.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 167,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0013100001.png"
    ],
    "explanation": "Box 1: {\"fr\", \"de\", \"es\"}\nA common task of speech translation is to specify target translation languages, at least one is required but multiples are supported. The following code snippet sets both French and German as translation language targets. static async Task TranslateSpeechAsync()\n{\nvar translationConfig =\nSpeechTranslationConfig.FromSubscription(SPEECH__SUBSCRIPTION__KEY, SPEECH__SERVICE__REGION); translationConfig.SpeechRecognitionLanguage = \"it-IT\";\n\n// Translate to languages. See, https://aka.ms/speech/sttt-languages translationConfig.AddTargetLanguage(\"fr\"); translationConfig.AddTargetLanguage(\"de\");\n}\n\nBox 2: TranslationRecognizer -\nAfter you've created a SpeechTranslationConfig, the next step is to initialize a TranslationRecognizer.\nExample code:\nstatic async Task TranslateSpeechAsync()\n{\nvar translationConfig =\nSpeechTranslationConfig.FromSubscription(SPEECH__SUBSCRIPTION__KEY, SPEECH__SERVICE__REGION); var fromLanguage = \"en-US\"; var toLanguages = new List<string> { \"it\", \"fr\", \"de\" }; translationConfig.SpeechRecognitionLanguage = fromLanguage; toLanguages.ForEach(translationConfig.AddTargetLanguage); using var recognizer = new TranslationRecognizer(translationConfig);\n}",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are developing a service that records lectures given in English (United Kingdom).\nYou have a method named AppendToTranscriptFile that takes translated text and a language identifier.\nYou need to develop code that will provide transcripts of the lectures to attendees in their respective language. The supported languages are English, French,\nSpanish, and German.\nHow should you complete the code? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0013100001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 168,
    "images": [
      "https://img.examtopics.com/ai-102/image57.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou have a Docker host named Host1 that contains a container base image.\n\nYou have an Azure subscription that contains a custom speech-to-text model named model1.\n\nYou need to run model1 on Host1.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image57.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 169,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou build a language model by using a Conversational Language Understanding. The language model is used to search for information on a contact list by using an intent named FindContact.\n\nA conversational expert provides you with the following list of phrases to use for training.\n\n• Find contacts in London.\n• Who do I know in Seattle?\n• Search for contacts in Ukraine.\n\nYou need to implement the phrase list in Conversational Language Understanding.\n\nSolution: You create a new utterance for each phrase in the FindContact intent.\n\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 170,
    "images": [
      "https://img.examtopics.com/ai-102/image59.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou have a question answering project in Azure Cognitive Service for Language.\n\nYou need to move the project to a Language service instance in a different Azure region.\n\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image59.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 171,
    "images": [
      "https://img.examtopics.com/ai-102/image61.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou are building a customer support chatbot.\n\nYou need to configure the bot to identify the following:\n\n• Code names for internal product development\n• Messages that include credit card numbers\n\nThe solution must minimize development effort.\n\nWhich Azure Cognitive Service for Language feature should you use for each requirement? To answer, drag the appropriate features to the correct requirements. Each feature may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image61.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 172,
    "images": [
      "https://img.examtopics.com/ai-102/image72.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building an app by using the Speech SDK. The app will translate speech from French to German by using natural language processing.\n\nYou need to define the source language and the output language.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image72.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 173,
    "images": [
      "https://img.examtopics.com/ai-102/image74.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou have a collection of Microsoft Word documents and PowerPoint presentations in German.\n\nYou need to create a solution to translate the files to French. The solution must meet the following requirements:\n\n• Preserve the original formatting of the files.\n• Support the use of a custom glossary.\n\nYou create a blob container for German files and a blob container for French files. You upload the original files to the container for German files.\n\nWhich three actions should you perform in sequence to complete the solution? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image74.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 174,
    "images": [
      "https://img.examtopics.com/ai-102/image76.png",
      "https://img.examtopics.com/ai-102/image77.png"
    ],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "The quick -\nThe lazy",
      "the quick brown fox jumps over the lazy dog",
      "jumps over the",
      "quick brown fox\nlazy dog"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have the following C# function.\n\n\n[Image: https://img.examtopics.com/ai-102/image76.png]\n\n[Image: https://img.examtopics.com/ai-102/image77.png]\n\n\n\nYou call the function by using the following code.\n\n\n[Image: https://img.examtopics.com/ai-102/image76.png]\n\n[Image: https://img.examtopics.com/ai-102/image77.png]\n\n\n\nWhich output will you receive?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 175,
    "images": [
      "https://img.examtopics.com/ai-102/image78.png"
    ],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "create_resource(\"res1\", \"TextAnalytics\", \"Standard\", \"East US\")",
      "create_resource(\"res1\", \"ContentModerator\", \"S0\", \"eastus\")",
      "create_resource(\"res1\", \"ContentModerator\", \"Standard\", \"East US\")",
      "create_resource(\"res1\", \"TextAnalytics\", \"S0\", \"eastus\")"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have the following Python method.\n\n\n[Image: https://img.examtopics.com/ai-102/image78.png]\n\n\n\nYou need to deploy an Azure resource to the East US Azure region. The resource will be used to perform sentiment analysis.\n\nHow should you call the method?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 176,
    "images": [
      "https://img.examtopics.com/ai-102/image79.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\n\nYou develop a Python app named App1 that performs speech-to-speech translation.\n\nYou need to configure App1 to translate English to German.\n\nHow should you complete the SpeechTranslationConfig object? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once or not at all. You may need to drag the split bar between panes or scroll to view content.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image79.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 177,
    "images": [
      "https://img.examtopics.com/ai-102/image81.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are developing a streaming Speech to Text solution that will use the Speech SDK and MP3 encoding.\n\nYou need to develop a method to convert speech to text for streaming MP3 data.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image81.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 179,
    "images": [
      "https://img.examtopics.com/ai-102/image97.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building a chatbot.\n\nYou need to use the Content Moderator API to identify aggressive and sexually explicit language.\n\nWhich three settings should you configure? To answer, select the appropriate settings in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image97.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 180,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Language",
      "Speech",
      "Azure Cognitive Services",
      "Content Moderator"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You are developing an app that will use the Decision and Language APIs.\n\nYou need to provision resources for the app. The solution must ensure that each service is accessed by using a single endpoint and credential.\n\nWhich type of resource should you create?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 181,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "custom text classification",
      "entity linking",
      "custom Named Entity Recognition (NER)",
      "key phrase extraction"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You are building a chatbot.\n\nYou need to ensure that the bot will recognize the names of your company’s products and codenames. The solution must minimize development effort.\n\nWhich Azure Cognitive Service for Language service should you include in the solution?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 183,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "the access control request, the content type, and the content length",
      "the subscription key and the client trace ID",
      "the resource ID and the content language",
      "the subscription key, the subscription region, and the content type"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains a multi-service Azure Cognitive Services Translator resource named Translator1.\n\nYou are building an app that will translate text and documents by using Translator1.\n\nYou need to create the REST API request for the app.\n\nWhich headers should you include in the request?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 184,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Custom Vision",
      "Azure AI Computer Vision",
      "Azure AI Immersive Reader",
      "Azure AI Document Intelligence"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have a file share that contains 5,000 images of scanned invoices.\n\nYou need to analyze the images. The solution must extract the following data:\n\n• Invoice items\n• Sales amounts\n• Customer details\n\nWhat should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 185,
    "images": [
      "https://img.examtopics.com/ai-102/image122.png",
      "https://img.examtopics.com/ai-102/image123.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou are developing a text processing solution.\n\nYou have the function shown below.\n\n\n[Image: https://img.examtopics.com/ai-102/image122.png]\n\n[Image: https://img.examtopics.com/ai-102/image123.png]\n\n\n\nFor the second argument, you call the function and specify the following string.\n\nOur tour of Paris included a visit to the Eiffel Tower\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\n\n[Image: https://img.examtopics.com/ai-102/image122.png]\n\n[Image: https://img.examtopics.com/ai-102/image123.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 186,
    "images": [
      "https://img.examtopics.com/ai-102/image125.png",
      "https://img.examtopics.com/ai-102/image126.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou are developing a text processing solution.\n\nYou develop the following method.\n\n\n[Image: https://img.examtopics.com/ai-102/image125.png]\n\n[Image: https://img.examtopics.com/ai-102/image126.png]\n\n\n\nYou call the method by using the following code.\n\nget_key_phrases(text_analytics_client, \"the cat sat on the mat\")\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image125.png]\n\n[Image: https://img.examtopics.com/ai-102/image126.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 187,
    "images": [
      "https://img.examtopics.com/ai-102/image128.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are developing a service that records lectures given in English (United Kingdom).\n\nYou have a method named append_to_transcript_file that takes translated text and a language identifier.\n\nYou need to develop code that will provide transcripts of the lectures to attendees in their respective language. The supported languages are English, French, Spanish, and German.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image128.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 188,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "the style attribute of the mstts:express-as element",
      "the effect attribute of the voice element",
      "the pitch attribute of the prosody element",
      "the level attribute of the emphasis element"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You are developing an app that will use the text-to-speech capability of the Azure AI Speech service. The app will be used in motor vehicles.\n\nYou need to optimize the quality of the synthesized voice output.\n\nWhich Speech Synthesis Markup Language (SSML) attribute should you configure?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 189,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "machine learned",
      "Regex",
      "list",
      "Pattern.any"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are building a Conversational Language Understanding model for an e-commerce chatbot. Users can speak or type their billing address when prompted by the chatbot.\nYou need to construct an entity to capture billing addresses.\nWhich entity type should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 190,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Azure AI Immersive Reader",
      "Azure AI Translator",
      "Azure AI Document Intelligence",
      "Azure AI Language"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are designing a content management system.\n\nYou need to ensure that the reading experience is optimized for users who have reduced comprehension and learning differences, such as dyslexia. The solution must minimize development effort.\n\nWhich Azure service should you include in the solution?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 191,
    "images": [
      "https://img.examtopics.com/ai-102/image130.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou are building an app that will answer customer calls about the status of an order. The app will query a database for the order details and provide the customers with a spoken response.\n\nYou need to identify which Azure AI service APIs to use. The solution must minimize development effort.\n\nWhich object should you use for each requirement? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image130.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 192,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "azure-cognitiveservices-language-textanalytics",
      "azure-ai-language-conversations",
      "azure-mgmt-cognitiveservices",
      "azure-cognitiveservices-speech"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have an Azure AI service model named Model1 that identifies the intent of text input.\n\nYou develop a Python app named App1.\n\nYou need to configure App1 to use Model1.\n\nWhich package should you add to App1?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 193,
    "images": [
      "https://img.examtopics.com/ai-102/image132.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building an app that will automatically translate speech from English to French, German, and Spanish by using Azure AI service.\n\nYou need to define the output languages and configure the Azure AI Speech service.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image132.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 195,
    "images": [
      "https://img.examtopics.com/ai-102/image136.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have a collection of press releases stored as PDF files.\n\nYou need to extract text from the files and perform sentiment analysis.\n\nWhich service should you use for each task? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image136.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 196,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "speech-to-text in the Azure AI Speech service",
      "object detection in Azure AI Custom Vision",
      "Spatial Analysis in Azure AI Vision",
      "object detection in Azure AI Custom Vision"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You are building an internet-based training solution. The solution requires that a user's camera and microphone remain enabled.\n\nYou need to monitor a video stream of the user and verify that the user is alone and is not collaborating with another user. The solution must minimize development effort.\n\nWhat should you include in the solution?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 197,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Azure AI Language",
      "Azure AI Speech",
      "Azure AI Services",
      "Azure AI Content Safety"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You are developing an app that will use the Speech and Language APIs.\n\nYou need to provision resources for the app. The solution must ensure that each service is accessed by using a single endpoint and credential.\n\nWhich type of resource should you create?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 198,
    "images": [
      "https://img.examtopics.com/ai-102/image154.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building an app that will automatically translate speech from English to French, German, and Spanish by using Azure AI service.\n\nYou need to define the output languages and configure the Azure AI Speech service.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image154.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 199,
    "images": [
      "https://img.examtopics.com/ai-102/image172.png"
    ],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "London and Buckingham Palace only",
      "Tour and visit only",
      "London and Tour only",
      "Our tour of London included visit to Buckingham Palace"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are developing a text processing solution.\n\nYou have the following function.\n\n\n[Image: https://img.examtopics.com/ai-102/image172.png]\n\n\n\nYou call the function and use the following string as the second argument.\n\nOur tour of London included a visit to Buckingham Palace\n\nWhat will the function return?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 200,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Pattern.any",
      "machine-learning",
      "regular expression",
      "list"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are building an Azure AI Language Understanding solution.\n\nYou discover that many intents have similar utterances containing airport names or airport codes.\n\nYou need to minimize the number of utterances used to train the model.\n\nWhich type of custom entity should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 201,
    "images": [],
    "explanation": "BD",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Create a list of FileDTO objects that represents data from the WebJob.",
      "Call the client.Knowledgebase.CreateAsync method.",
      "Create a list of QnADTO objects that represents data from the WebJob.",
      "Create a CreateKbDTO object."
    ],
    "correct": [
      1,
      3
    ],
    "multiple": true,
    "text": "You are building an Azure WebJob that will create knowledge bases from an array of URLs.\nYou instantiate a QnAMakerClient object that has the relevant API keys and assign the object to a variable named client.\nYou need to develop a method to create the knowledge bases.\nWhich two actions should you include in the method? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 202,
    "images": [
      "https://img.examtopics.com/ai-102/image173.png"
    ],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "The quick -\nThe lazy",
      "jumps over the",
      "quick brown fox\nlazy dog",
      "the quick brown fox jumps over the lazy dog"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have the following Python function.\n\n\n[Image: https://img.examtopics.com/ai-102/image173.png]\n\n\n\nYou call the function by using the following code.\n\nmy_function(text_analytics_client, \"the quick brown fox jumps over the lazy dog\")\n\nFollowing 'Key phrases', what output will you receive?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "nlp",
    "questionId": 204,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0013700001.jpg"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are developing an application that includes language translation.\nThe application will translate text retrieved by using a function named getTextToBeTranslated. The text can be in one of many languages. The content of the text must remain within the Americas Azure geography.\nYou need to develop code to translate the text to a single language.\nHow should you complete the code? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0013700001.jpg]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "nlp",
    "questionId": 205,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0018800001.jpg",
      "https://www.examtopics.com/assets/media/exam-media/04271/0018800002.png"
    ],
    "explanation": "Box 1: Yes -\nThe Key Phrase Extraction API evaluates unstructured text, and for each JSON document, returns a list of key phrases.\n\nBox 2: No -\n'the' is not a key phrase.\nThis capability is useful if you need to quickly identify the main points in a collection of documents. For example, given input text \"The food was delicious and there were wonderful staff\", the service returns the main talking points: \"food\" and \"wonderful staff\".\n\nBox 3: No -\nKey phrase extraction does not have confidence levels.\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/text-analytics/how-tos/text-analytics-how-to-keyword-extraction",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are developing a text processing solution.\nYou develop the following method.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0018800001.jpg]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0018800002.png]\n\n\nYou call the method by using the following code.\nGetKeyPhrases(textAnalyticsClient, \"the cat sat on the mat\");\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0018800001.jpg]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0018800002.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "nlp",
    "questionId": 207,
    "images": [],
    "explanation": "BE",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "storageContainer",
      "storageConnectionString",
      "files",
      "tables",
      "objects"
    ],
    "correct": [
      1,
      4
    ],
    "multiple": true,
    "text": "You have an Azure Cognitive Search solution and an enrichment pipeline that performs Sentiment Analysis on social media posts.\nYou need to define a knowledge store that will include the social media posts and the Sentiment Analysis results.\nWhich two fields should you include in the definition? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 241,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0024000001.png",
      "https://www.examtopics.com/assets/media/exam-media/04271/0024100001.png"
    ],
    "explanation": "Reference:\nhttps://github.com/solliancenet/tech-immersion-data-ai/blob/master/ai-exp1/README.md",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are building a bot and that will use Language Understanding.\nYou have a LUDown file that contains the following content.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0024000001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0024100001.png]\n\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0024000001.png]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0024100001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 244,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0024700001.png"
    ],
    "explanation": "Step 1: For the knowledge base, select Show active learning suggestions.\nIn order to see the suggested questions, on the Edit knowledge base page, select View Options, then select Show active learning suggestions.\nStep 2: Approve and reject suggestions.\nEach QnA pair suggests the new question alternatives with a check mark, , to accept the question or an x to reject the suggestions. Select the check mark to\nג\"\nadd the question.\nStep 3: Save and train the knowledge base.\nSelect Save and Train to save the changes to the knowledge base.\nStep 4: Publish the knowledge base.\nSelect Publish to allow the changes to be available from the GenerateAnswer API.\nWhen 5 or more similar queries are clustered, every 30 minutes, QnA Maker suggests the alternate questions for you to accept or reject.\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/how-to/improve-knowledge-base",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou have a chatbot that uses a QnA Maker application.\nYou enable active learning for the knowledge base used by the QnA Maker application.\nYou need to integrate user input into the model.\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0024700001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 247,
    "images": [],
    "explanation": "Step 1: Sign in to the QnAMaker.ai portal with your Azure credentials. Use the User1-12345678@abc.com account\nStep 2: Publish the knowledge base. In the QnA Maker portal, select Publish. Then to confirm, select Publish on the page.\nThe QnA Maker service is now successfully published. You can use the endpoint in your application or bot code.\n\nStep 3: In the QnA Maker portal, on the Publish page, select Create bot.\nThis button appears only after you've published the knowledge base.\nAfter publishing the knowledge base, you can create a bot from the Publish page.\n\nStep 4: A new browser tab opens for the Azure portal, with the Azure Bot Service's creation page. Configure the Azure bot service.\n\nBot name: bot12345678 -\nThe bot will be created.\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/create-publish-knowledge-base",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nYou need to create and publish a bot that will use Language Understanding and QnA Maker. The bot must be named bot12345678. You must publish the bot by using the User1-12345678@abc.com account.\nNOTE: Complete this task first. It may take several minutes to complete the required deployment steps. While this is taking place, you can complete tasks 2-6 in this lab during the deployment.\nTo complete this task, use the Microsoft Bot Framework Composer.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 248,
    "images": [],
    "explanation": "Step 1: Sign in to the Azure portal create and a QnA Maker resource.\n\nStep 2: Select Create after you read the terms and conditions:\n\nStep 3: In QnA Maker, select the appropriate tiers and regions.\n\nName: QNA12345678 -\nIn the Name field, enter a unique name to identify this QnA Maker service. This name also identifies the QnA Maker endpoint that your knowledge bases will be associated with.\nResource Group Location: East US Azure\n\nStep 4: After all the fields are validated, select Create. The process can take a few minutes to complete.\nAfter deployment is completed, you'll see the following resources created in your subscription:\n\nRemember your Azure Active Directory ID, Subscription, QnA resource name you selected when you created the resource.\nStep 5: When you are done creating the resource in the Azure portal, return to the QnA Maker portal, refresh the browser page.\nStep 6: In the QnA Maker portal, select Create a knowledge base.\nStep 7: Skip Step 1 as you already have your QnA Maker resource.\nStep 8: In Step 2, select your Active directory, subscription, service (resource), and the language for all knowledge bases created in the service.\n\nAzure QnA service: QNA12345678 -\n\nStep 9: In Step 3, name your knowledge base\nStep 10: In Step 4, configure the following setting:\n+ Add URL: https://support.microsoft.com/en-us/help/12435/windows-10-upgrade-faq\nStep 11: In Step 5, Select Create your KB.\nThe extraction process takes a few moments to read the document and identify questions and answers.\nAfter QnA Maker successfully creates the knowledge base, the Knowledge base page opens.\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/how-to/set-up-qnamaker-service-azure https://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/quickstarts/create-publish-knowledge-base",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nYou need to create a QnA Maker service named QNA12345678 in the East US Azure region. QNA12345678 must contain a knowledge base that uses the questions and answers available at https://support.microsoft.com/en-us/help/12435/windows-10-upgrade-faq.\nTo complete this task, sign in to the Azure portal and the QnA Maker portal.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 250,
    "images": [],
    "explanation": "Step 1: Sign in to the QnA portal, then select the knowledge base to add the QnA pair to.\nStep 2: On the EDIT page of the knowledge base, select Add QnA pair to add a new QnA pair.\n\nStep 3: In the new QnA pair row, add the required question and answer fields. The other fields are optional. All fields can be changed at any time.\nQuestion: What will be the next version of Windows?\nStep 4: Select Save and train to see predictions including the new QnA pair.\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/how-to/edit-knowledge-base",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nYou need to add a question pair to the published knowledge base used by a QnA Maker service named QNA12345678. The question must be: `What will be the next version of Windows?`\nThe answer must be: `Windows 11`.\nTo complete this task, sign in to the QnA Maker portal.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 255,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a chatbot that uses question answering in Azure Cognitive Service for Language.\n\nUsers report that the responses of the chatbot lack formality when answering spurious questions.\n\nYou need to ensure that the chatbot provides formal responses to spurious questions.\n\nSolution: From Language Studio, you change the chitchat source to qna_chitchat_friendly.tsv, and then retrain and republish the model.\n\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 256,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a chatbot that uses question answering in Azure Cognitive Service for Language.\n\nUsers report that the responses of the chatbot lack formality when answering spurious questions.\n\nYou need to ensure that the chatbot provides formal responses to spurious questions.\n\nSolution: From Language Studio, you modify the question and answer pairs for the custom intents, and then retrain and republish the model.\n\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 257,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a chatbot that uses question answering in Azure Cognitive Service for Language.\n\nUsers report that the responses of the chatbot lack formality when answering spurious questions.\n\nYou need to ensure that the chatbot provides formal responses to spurious questions.\n\nSolution: From Language Studio, you change the chitchat source to qna_chitchat_professional.tsv, and then retrain and republish the model.\n\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 260,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou are building a chatbot that will use question answering in Azure Cognitive Service for Language.\n\nYou have a PDF named Doc1.pdf that contains a product catalogue and a price list.\n\nYou upload Doc1.pdf and train the model.\n\nDuring testing, users report that the chatbot responds correctly to the following question: What is the price of ?\n\nThe chatbot fails to respond to the following question: How much does cost?\n\nYou need to ensure that the chatbot responds correctly to both questions.\n\nSolution: From Language Studio, you add alternative phrasing to the question and answer pair, and then retrain and republish the model.\n\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 261,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou are building a chatbot that will use question answering in Azure Cognitive Service for Language.\n\nYou have a PDF named Doc1.pdf that contains a product catalogue and a price list.\n\nYou upload Doc1.pdf and train the model.\n\nDuring testing, users report that the chatbot responds correctly to the following question: What is the price of ?\n\nThe chatbot fails to respond to the following question: How much does cost?\n\nYou need to ensure that the chatbot responds correctly to both questions.\n\nSolution: From Language Studio, you enable chit-chat, and then retrain and republish the model.\n\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 262,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou are building a chatbot that will use question answering in Azure Cognitive Service for Language.\n\nYou have a PDF named Doc1.pdf that contains a product catalogue and a price list.\n\nYou upload Doc1.pdf and train the model.\n\nDuring testing, users report that the chatbot responds correctly to the following question: What is the price of ?\n\nThe chatbot fails to respond to the following question: How much does cost?\n\nYou need to ensure that the chatbot responds correctly to both questions.\n\nSolution: From Language Studio, you create an entity for price, and then retrain and republish the model.\n\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 263,
    "images": [
      "https://img.examtopics.com/ai-102/image23.png"
    ],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "last year",
      "by month",
      "amount of",
      "average"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have a Conversational Language Understanding model.\n\nYou export the model as a JSON file. The following is a sample of the file.\n\n\n[Image: https://img.examtopics.com/ai-102/image23.png]\n\n\n\nWhat represents the Weather.Historic entity in the sample utterance?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 268,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou have a chatbot that uses question answering in Azure Cognitive Service for Language.\n\nUsers report that the responses of the chatbot lack formality when answering spurious questions.\n\nYou need to ensure that the chatbot provides formal responses to spurious questions.\n\nSolution: From Language Studio, you remove all the chit-chat question and answer pairs, and then retrain and republish the model.\n\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 270,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0022500001.png"
    ],
    "explanation": "Step 1: Add a new application -\n\nCreate a new app -\n1. Sign in to the LUIS portal with the URL of https://www.luis.ai.\n2. Select Create new app.\n3. Etc.\nStep 2: Add example utterances.\nIn order to classify an utterance, the intent needs examples of user utterances that should be classified with this intent.\n\nStep 3: Train the application -\n\nStep 4: Publish the application -\nIn order to receive a LUIS prediction in a chat bot or other client application, you need to publish the app to the prediction endpoint.\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/luis/tutorial-intents-only",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou plan to build a chatbot to support task tracking.\nYou create a Language Understanding service named lu1.\nYou need to build a Language Understanding model to integrate into the chatbot. The solution must minimize development time to build the model.\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0022500001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 274,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Enable active learning.",
      "Add entities.",
      "Add examples to the None intent.",
      "Add examples to the custom intents."
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You develop a Conversational Language Understanding model by using Language Studio.\n\nDuring testing, users receive incorrect responses to requests that do NOT relate to the capabilities of the model.\n\nYou need to ensure that the model identifies spurious requests.\n\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 280,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "From the Language Understanding portal, clone the model.",
      "Export the model as an .lu file.",
      "Create a new Speech service.",
      "Create a new Language Understanding service."
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You are building a bot on a local computer by using the Microsoft Bot Framework. The bot will use an existing Language Understanding model.\nYou need to translate the Language Understanding model locally by using the Bot Framework CLI.\nWhat should you do first?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 283,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\n\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\n\nYou are building a chatbot that will use question answering in Azure Cognitive Service for Language.\n\nYou have a PDF named Doc1.pdf that contains a product catalogue and a price list.\n\nYou upload Doc1.pdf and train the model.\n\nDuring testing, users report that the chatbot responds correctly to the following question: What is the price of ?\n\nThe chatbot fails to respond to the following question: How much does cost?\n\nYou need to ensure that the chatbot responds correctly to both questions.\n\nSolution: From Language Studio, you create an entity for cost, and then retrain and republish the model.\n\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 285,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0022800001.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou are using a Language Understanding service to handle natural language input from the users of a web-based customer agent.\nThe users report that the agent frequently responds with the following generic response: \"Sorry, I don't understand that.\"\nYou need to improve the ability of the agent to respond to requests.\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0022800001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "5",
    "domainId": "nlp",
    "questionId": 286,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Access control (IAM)",
      "Properties",
      "Keys and Endpoint",
      "Identity"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You build a conversational bot named bot1.\nYou need to configure the bot to use a QnA Maker application.\nFrom the Azure Portal, where can you find the information required by bot1 to connect to the QnA Maker application?",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "nlp",
    "questionId": 292,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "QnAMakerOptions.StrictFilters",
      "QnADialogResponseOptions.CardNoMatchText",
      "QnAMakerOptions.RankerType",
      "QnAMakerOptions.ScoreThreshold"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You are developing the chatbot.\nYou create the following components:\n✑ A QnA Maker resource\n✑ A chatbot by using the Azure Bot Framework SDK\nYou need to integrate the components to meet the chatbot requirements.\nWhich property should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "nlp",
    "questionId": 295,
    "images": [
      "https://img.examtopics.com/ai-102/image149.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription.\n\nYou need to create a new resource that will generate fictional stories in response to user prompts. The solution must ensure that the resource uses a customer-managed key to protect data.\n\nHow should you complete the script? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image149.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "7",
    "domainId": "nlp",
    "questionId": 304,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Microsoft Translator",
      "Language Understanding",
      "Orchestrator",
      "chatdown"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You are developing the chatbot.\nYou create the following components:\n✑ A QnA Maker resource\n✑ A chatbot by using the Azure Bot Framework SDK\nYou need to add an additional component to meet the technical requirements and the chatbot requirements.\nWhat should you add?",
    "questionKind": "mc"
  },
  {
    "topic": "7",
    "domainId": "nlp",
    "questionId": 308,
    "images": [
      "https://img.examtopics.com/ai-102/image189.png",
      "https://img.examtopics.com/ai-102/image190.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building an app that will provide users with definitions of common AI terms.\n\nYou create the following Python code.\n\n\n[Image: https://img.examtopics.com/ai-102/image189.png]\n\n[Image: https://img.examtopics.com/ai-102/image190.png]\n\n\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image189.png]\n\n[Image: https://img.examtopics.com/ai-102/image190.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "8",
    "domainId": "nlp",
    "questionId": 317,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0007700003.png"
    ],
    "explanation": "Box 1: Cognitive Service User -\nEnsure that the members of a group named Management-Accountants can approve the FAQs.\nApprove=publish.\nCognitive Service User (read/write/publish): API permissions: All access to Cognitive Services resource except for ability to:\n1. Add new members to roles.\n2. Create new resources.\nBox 2: Cognitive Services QnA Maker Editor\nEnsure that the members of a group named Consultant-Accountants can create and amend the FAQs.\nQnA Maker Editor: API permissions:\n1. Create KB API\n2. Update KB API\n3. Replace KB API\n4. Replace Alterations\n5. \"Train API\" [in new service model v5]\nBox 3: Cognitive Services QnA Maker Read\nEnsure that the members of a group named the Agent-CustomerServices can browse the FAQs.\nQnA Maker Read: API Permissions:\n1. Download KB API\n2. List KBs for user API\n3. Get Knowledge base details\n4. Download Alterations\n\nGenerate Answer -\nReference:\nhttps://docs.microsoft.com/en-us/azure/cognitive-services/qnamaker/concepts/role-based-access-control",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou build a QnA Maker resource to meet the chatbot requirements.\nWhich RBAC role should you assign to each group? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0007700003.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 3,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0001700001.png"
    ],
    "explanation": "ACF",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "File1",
      "File2",
      "File3",
      "File4",
      "File5",
      "File6"
    ],
    "correct": [
      0,
      2,
      5
    ],
    "multiple": true,
    "text": "You build a custom Form Recognizer model.\nYou receive sample files to use for training the model as shown in the following table.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0001700001.png]\n\n\nWhich three files can you use to train the model? Each correct answer presents a complete solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 4,
    "images": [],
    "explanation": "ABF",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "The index size will increase.",
      "Query times will increase.",
      "A self-signed X.509 certificate is required.",
      "The index size will decrease.",
      "Query times will decrease.",
      "Azure Key Vault is required."
    ],
    "correct": [
      0,
      1,
      5
    ],
    "multiple": true,
    "text": "A customer uses Azure Cognitive Search.\nThe customer plans to enable a server-side encryption and use customer-managed keys (CMK) stored in Azure.\nWhat are three implications of the planned change? Each correct answer presents a complete solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 6,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou create a web app named app1 that runs on an Azure virtual machine named vm1. Vm1 is on an Azure virtual network named vnet1.\nYou plan to create a new Azure Cognitive Search service named service1.\nYou need to ensure that app1 can connect directly to service1 without routing traffic over the public internet.\nSolution: You deploy service1 and a public endpoint to a new virtual network, and you configure Azure Private Link.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 7,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou create a web app named app1 that runs on an Azure virtual machine named vm1. Vm1 is on an Azure virtual network named vnet1.\nYou plan to create a new Azure Cognitive Search service named service1.\nYou need to ensure that app1 can connect directly to service1 without routing traffic over the public internet.\nSolution: You deploy service1 and a public endpoint, and you configure an IP firewall rule.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 8,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou create a web app named app1 that runs on an Azure virtual machine named vm1. Vm1 is on an Azure virtual network named vnet1.\nYou plan to create a new Azure Cognitive Search service named service1.\nYou need to ensure that app1 can connect directly to service1 without routing traffic over the public internet.\nSolution: You deploy service1 and a public endpoint, and you configure a network security group (NSG) for vnet1.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 15,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou have an Azure Cognitive Search service.\nDuring the past 12 months, query volume steadily increased.\nYou discover that some search query requests to the Cognitive Search service are being throttled.\nYou need to reduce the likelihood that search query requests are throttled.\nSolution: You migrate to a Cognitive Search service that uses a higher tier.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 17,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "the FormRecognizerClient client and the StartRecognizeContentFromUri method",
      "the FormTrainingClient client and the StartRecognizeContentFromUri method",
      "the FormRecognizerClient client and the StartRecognizeReceiptsFromUri method",
      "the FormTrainingClient client and the StartRecognizeReceiptsFromUri method"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have receipts that are accessible from a URL.\nYou need to extract data from the receipts by using Form Recognizer and the SDK. The solution must use a prebuilt model.\nWhich client and method should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 18,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "a new Computer Vision resource",
      "a free (Limited enrichments) Cognitive Services resource",
      "an Azure Machine Learning Designer pipeline",
      "a new Cognitive Services resource that uses the S0 pricing tier"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have a collection of 50,000 scanned documents that contain text.\nYou plan to make the text available through Azure Cognitive Search.\nYou need to configure an enrichment pipeline to perform optical character recognition (OCR) and text analytics. The solution must minimize costs.\nWhat should you attach to the skillset?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 19,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou have an Azure Cognitive Search service.\nDuring the past 12 months, query volume steadily increased.\nYou discover that some search query requests to the Cognitive Search service are being throttled.\nYou need to reduce the likelihood that search query requests are throttled.\nSolution: You add indexes.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 20,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou have an Azure Cognitive Search service.\nDuring the past 12 months, query volume steadily increased.\nYou discover that some search query requests to the Cognitive Search service are being throttled.\nYou need to reduce the likelihood that search query requests are throttled.\nSolution: You enable customer-managed key (CMK) encryption.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 21,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou create a web app named app1 that runs on an Azure virtual machine named vm1. Vm1 is on an Azure virtual network named vnet1.\nYou plan to create a new Azure Cognitive Search service named service1.\nYou need to ensure that app1 can connect directly to service1 without routing traffic over the public internet.\nSolution: You deploy service1 and a private endpoint to vnet1.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 25,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "a projection group",
      "a table projection",
      "a file projection",
      "an object projection"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have an Azure Cognitive Search instance that indexes purchase orders by using Form Recognizer.\nYou need to analyze the extracted information by using Microsoft Power BI. The solution must minimize development effort.\nWhat should you add to the indexer?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 26,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Yes",
      "No"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "Note: This question is part of a series of questions that present the same scenario. Each question in the series contains a unique solution that might meet the stated goals. Some question sets might have more than one correct solution, while others might not have a correct solution.\nAfter you answer a question in this section, you will NOT be able to return to it. As a result, these questions will not appear in the review screen.\nYou have an Azure Cognitive Search service.\nDuring the past 12 months, query volume steadily increased.\nYou discover that some search query requests to the Cognitive Search service are being throttled.\nYou need to reduce the likelihood that search query requests are throttled.\nSolution: You add replicas.\nDoes this meet the goal?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 30,
    "images": [],
    "explanation": "Step 1: Sign in to the Azure Portal.\nStep 2: Navigate to the Form Recognizer Sample Tool (at https://fott-2-1.azurewebsites.net)\nStep 3: On the sample tool home page select Use prebuilt model to get data.\n\nStep 4: Select the Form Type you would like to analyze from the dropdown window.\nStep 5: In the Source: URL field, paste the selected URL and select the Fetch button.\nStep 6: In the Choose file for analysis use the file in the C:\\Resources\\Invoices folder and select the Fetch button.\n\nStep 7: Select Run analysis. The Form Recognizer Sample Labeling tool will call the Analyze Prebuilt API and analyze the document.\nStep 8: View the results - see the key-value pairs extracted, line items, highlighted text extracted and tables detected.\n\nStep 9: Save the results as C:\\Resources\\Invoices\\Results.json.\nReference:\nhttps://docs.microsoft.com/en-us/azure/applied-ai-services/form-recognizer/quickstarts/try-sample-label-tool",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nYou need to create a Form Recognizer resource named fr12345678.\nUse the Form Recognizer sample labeling tool at https://fott-2-1.azurewebsites.net/ to analyze the invoice located in the C:\\Resources\\Invoices folder.\nSave the results as C:\\Resources\\Invoices\\Results.json.\nTo complete this task, sign in to the Azure portal and open the Form Recognizer sample labeling tool.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 32,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "searchable, sortable, and retrievable",
      "searchable, facetable, and retrievable",
      "retrievable, filterable, and sortable",
      "retrievable, facetable, and key"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have an Azure Cognitive Search solution and a collection of blog posts that include a category field.\nYou need to index the posts. The solution must meet the following requirements:\n* Include the category field in the search results.\n* Ensure that users can search for words in the category field.\n* Ensure that users can perform drill down filtering based on category.\nWhich index attributes should you configure for the category field?",
    "questionKind": "mc"
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 36,
    "images": [],
    "explanation": "Step 1: Login -\nBrowse to the Azure Video Indexer website and sign in.\nURL: https://www.videoindexer.ai/\n\nLogin admin@abc.com -\nStep 2: Create a project from your video\nYou can create a new project directly from a video in your account.\n1. Go to the Library tab of the Azure Video Indexer website.\n2. Open the video that you want to use to create your project. On the insights and timeline page, select the Video editor button.\nFolder: C:\\Resources\\Video\\Media.mp4\nThis takes you to the same page that you used to create a new project. Unlike the new project, you see the timestamped insights segments of the video, that you had started editing previously.\nStep 3: Save the insights to the C:\\Resources\\Video\\Insights.json folder.\nReference:\nhttps://docs.microsoft.com/en-us/azure/azure-video-indexer/use-editor-create-project",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nUse the following login credentials as needed:\nTo enter your username, place your cursor in the Sign in box and click on the username below.\nTo enter your password, place your cursor in the Enter password box and click on the password below.\n\nAzure Username: admin@abc.com -\n\nAzure Password: XXXXXXXXXXXX -\nThe following information is for technical support purposes only:\n\nLab Instance: 12345678 -\n\nTask -\nYou need to get insights from a video file located in the C:\\Resources\\Video\\Media.mp4 folder.\nSave the insights to the C:\\Resources\\Video\\Insights.json folder.\nTo complete this task, sign in to the Azure Video Analyzer for Media at https://www.videoindexer.ai/ by using admin@abc.com",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 48,
    "images": [
      "https://img.examtopics.com/ai-102/image24.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou have an Azure Cognitive Search resource named Search1 that is used by multiple apps.\n\nYou need to secure Search1. The solution must meet the following requirements:\n\n• Prevent access to Search1 from the internet.\n• Limit the access of each app to specific queries.\n\nWhat should you do? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image24.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "1",
    "domainId": "knowledge-mining",
    "questionId": 69,
    "images": [
      "https://img.examtopics.com/ai-102/image167.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have 1,000 scanned images of hand-written survey responses. The surveys do NOT have a consistent layout.\n\nYou have an Azure subscription that contains an Azure AI Document Intelligence resource named AIdoc1.\n\nYou open Document Intelligence Studio and create a new project.\n\nYou need to extract data from the survey responses. The solution must minimize development effort.\n\nTo where should you upload the images, and which type of model should you use? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image167.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "10",
    "domainId": "knowledge-mining",
    "questionId": 72,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0012500005.png"
    ],
    "explanation": "Step 1: Create a new project and load sample documents\nCreate a new project. Projects store your configurations and settings.\nStep 2: Label the sample documents\nWhen you create or open a project, the main tag editor window opens.\nStep 3: Train a custom model.\nFinally, train a custom model.\nReference:\nhttps://docs.microsoft.com/en-us/azure/applied-ai-services/form-recognizer/label-tool",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou are developing a solution for the Management-Bookkeepers group to meet the document processing requirements. The solution must contain the following components:\n✑ A From Recognizer resource\n✑ An Azure web app that hosts the Form Recognizer sample labeling tool\nThe Management-Bookkeepers group needs to create a custom table extractor by using the sample labeling tool.\nWhich three actions should the Management-Bookkeepers group perform in sequence? To answer, move the appropriate cmdlets from the list of cmdlets to the answer area and arrange them in the correct order.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0012500005.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "12",
    "domainId": "knowledge-mining",
    "questionId": 75,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0018600001.png"
    ],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "documentResults.docType == \"prebuilt:receipt\"",
      "documentResults.fields.*.confidence < 0.7",
      "documentResults.fields.ReceiptType.confidence > 0.7",
      "documentResults.fields.MerchantName.confidence < 0.7"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You need to develop an extract solution for the receipt images. The solution must meet the document processing requirements and the technical requirements.\nYou upload the receipt images to the Form Recognizer API for analysis, and the API returns the following JSON.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0018600001.png]\n\n\nWhich expression should you use to trigger a manual review of the extracted information by a member of the Consultant-Bookkeeper group?",
    "questionKind": "mc"
  },
  {
    "topic": "13",
    "domainId": "knowledge-mining",
    "questionId": 76,
    "images": [],
    "explanation": "ABF",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Make API queries to the autocomplete endpoint and include suggesterName in the body.",
      "Add a suggester that has the three product name fields as source fields.",
      "Make API queries to the search endpoint and include the product name fields in the searchFields query parameter.",
      "Add a suggester for each of the three product name fields.",
      "Set the searchAnalyzer property for the three product name variants.",
      "Set the analyzer property for the three product name variants."
    ],
    "correct": [
      0,
      1,
      5
    ],
    "multiple": true,
    "text": "You are developing the smart e-commerce project.\nYou need to implement autocompletion as part of the Cognitive Search solution.\nWhich three actions should you perform? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "14",
    "domainId": "knowledge-mining",
    "questionId": 78,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0021700001.png"
    ],
    "explanation": "Box 1: \"categories\": [\"Locations\", \"Persons\", \"Organizations\"],\nLocations, Persons, Organizations are in the outputs.\nScenario: Contoso plans to develop a searchable knowledgebase of all the intellectual property\nNote: The categories parameter is an array of categories that should be extracted. Possible category types: \"Person\", \"Location\", \"Organization\", \"Quantity\",\n\"Datetime\", \"URL\", \"Email\". If no category is provided, all types are returned.\nBox 2: {\"name\": \" entities\"}\nThe include wikis, so should include entities in the outputs.\nNote: entities is an array of complex types that contains rich information about the entities extracted from text, with the following fields name (the actual entity name. This represents a \"normalized\" form) wikipediaId wikipediaLanguage wikipediaUrl (a link to Wikipedia page for the entity) etc.\nReference:\nhttps://docs.microsoft.com/en-us/azure/search/cognitive-search-skill-entity-recognition",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are developing the knowledgebase by using Azure Cognitive Search.\nYou need to build a skill that will be used by indexers.\nHow should you complete the code? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0021700001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "14",
    "domainId": "knowledge-mining",
    "questionId": 79,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "an indexer for Azure Blob storage attached to a skillset that contains the language detection skill and the text translation skill",
      "an indexer for Azure Blob storage attached to a skillset that contains the language detection skill",
      "an indexer for Azure Cosmos DB attached to a skillset that contains the document extraction skill and the text translation skill",
      "an indexer for Azure Cosmos DB attached to a skillset that contains the language detection skill and the text translation skill"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You are developing the knowledgebase by using Azure Cognitive Search.\nYou need to process wiki content to meet the technical requirements.\nWhat should you include in the solution?",
    "questionKind": "mc"
  },
  {
    "topic": "14",
    "domainId": "knowledge-mining",
    "questionId": 80,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "synonym map",
      "a suggester",
      "a custom analyzer",
      "a built-in key phrase extraction skill"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are developing the knowledgebase by using Azure Cognitive Search.\nYou need to meet the knowledgebase requirements for searching equivalent terms.\nWhat should you include in the solution?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "knowledge-mining",
    "questionId": 97,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "image analysis",
      "optical character recognition (OCR)",
      "key phrase extraction",
      "document extraction"
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have an Azure Cognitive Search solution and a collection of handwritten letters stored as JPEG files.\n\nYou plan to index the collection. The solution must ensure that queries can be performed on the contents of the letters.\n\nYou need to create an indexer that has a skillset.\n\nWhich skill should you include?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "knowledge-mining",
    "questionId": 101,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "From the Azure portal, configure parallel indexing.",
      "From the Azure portal, configure scheduled indexing.",
      "Configure field mappings by using the REST API.",
      "Create a text-based indexer by using the REST API."
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an AI enrichment pipeline in Azure Cognitive Search and an Azure Storage account that has 10 GB of scanned documents and images.\n\nYou need to index the documents and images in the storage account. The solution must minimize how long it takes to build the index.\n\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "knowledge-mining",
    "questionId": 103,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "raw image binary",
      "form URL encoded",
      "JSON"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You have a mobile app that manages printed forms.\n\nYou need the app to send images of the forms directly to Forms Recognizer to extract relevant information. For compliance reasons, the image files must not be stored in the cloud.\n\nIn which format should you send the images to the Form Recognizer API endpoint?",
    "questionKind": "mc"
  },
  {
    "topic": "2",
    "domainId": "knowledge-mining",
    "questionId": 117,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0008500001.png"
    ],
    "explanation": "Reference:\nhttps://docs.microsoft.com/en-us/azure/azure-video-analyzer/video-analyzer-for-media-docs/video-indexer-embed-widgets",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou are developing a webpage that will use the Azure Video Analyzer for Media (previously Video Indexer) service to display videos of internal company meetings.\nYou embed the Player widget and the Cognitive Insights widget into the page.\nYou need to configure the widgets to meet the following requirements:\n✑ Ensure that users can search for keywords.\n✑ Display the names and faces of people in the video.\n✑ Show captions in the video in English (United States).\nHow should you complete the URL for each widget? To answer, drag the appropriate values to the correct targets. Each value may be used once, more than once, or not at all. You may need to drag the split bar between panes or scroll to view content.\nNOTE: Each correct selection is worth one point.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0008500001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "2",
    "domainId": "knowledge-mining",
    "questionId": 119,
    "images": [
      "https://img.examtopics.com/ai-102/image169.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription that contains an Azure AI Video Indexer account.\n\nYou need to add a custom brand and logo to the indexer and configure an exclusion for the custom brand.\n\nHow should you complete the REST API call? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image169.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "knowledge-mining",
    "questionId": 147,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Migrate the data in HR to Azure Blob storage.",
      "Migrate the data in HR to the on-premises SQL server.",
      "Export the data in Finance to Azure Data Lake Storage.",
      "Ingest the data in Logs into Azure Sentinel."
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have the following data sources:\n✑ Finance: On-premises Microsoft SQL Server database\n✑ Sales: Azure Cosmos DB using the Core (SQL) API\n✑ Logs: Azure Table storage\n✑ HR: Azure SQL database\nYou need to ensure that you can search all the data by using the Azure Cognitive Search REST API.\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "3",
    "domainId": "knowledge-mining",
    "questionId": 194,
    "images": [
      "https://img.examtopics.com/ai-102/image134.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\n\nYou plan to implement an Azure AI Search resource that will use custom skill based on sentiment analysis.\n\nYou need to create a custom model and configure Azure AI Search use the model.\n\nWhich five actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image134.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "3",
    "domainId": "knowledge-mining",
    "questionId": 203,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "AzureOpenAIEmbeddingSkill",
      "DocumentExtractionSkill",
      "EntityRecognitionSkill",
      "EntityLinkingSkill"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have an Azure subscription.\n\nYou need to deploy an Azure AI Search resource that will recognize geographic locations.\n\nWhich built-in skill should you include in the skillset for the resource?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 206,
    "images": [],
    "explanation": "CDF",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Send Azure AD access tokens with the search request.",
      "Retrieve all the groups.",
      "Retrieve the group memberships of the user.",
      "Add allowed groups to each index entry.",
      "Create one index per group.",
      "Supply the groups as a filter for the search requests."
    ],
    "correct": [
      2,
      3,
      5
    ],
    "multiple": true,
    "text": "You are developing an application that will use Azure Cognitive Search for internal documents.\nYou need to implement document-level filtering for Azure Cognitive Search.\nWhich three actions should you include in the solution? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 208,
    "images": [],
    "explanation": "Step 1 - Start the Import data wizard and create a data source\n1. Sign in to the Azure portal with your Azure account.\n2. Find your search service and on the Overview page, click Import data on the command bar to create and populate a search index.\n\n3. In the wizard, click Connect to your data, and select the sample database named realestate-us-sample\nStep 2 - Skip the \"Enrich content\" page\nThe wizard supports the creation of an AI enrichment pipeline for incorporating the Cognitive Services AI algorithms into indexing.\nWe'll skip this step for now, and move directly on to Customize target index.\n\nStep 3 - Configure index -\nThe solution must ensure that users can search the index in English for people, organizations, and locations.\nConfigure Searchable for the fields people, organizations, and locations.\n\nReference:\nhttps://docs.microsoft.com/en-us/azure/search/search-get-started-portal",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "SIMULATION -\nUse the following login credentials as needed:\nTo enter your username, place your cursor in the Sign in box and click on the username below.\nTo enter your password, place your cursor in the Enter password box and click on the password below.\n\nAzure Username: admin@abc.com -\n\nAzure Password: XXXXXXXXXXXX -\nThe following information is for technical support purposes only:\n\nLab Instance: 12345678 -\n\nTask -\nYou need to create an Azure resource named solution12345678 that will index a sample database named realestate-us-sample. The solution must ensure that users can search the index in English for people, organizations, and locations.\nTo complete this task, sign in to the Azure portal.",
    "questionKind": "simulation",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 209,
    "images": [
      "https://img.examtopics.com/ai-102/image16.png",
      "https://img.examtopics.com/ai-102/image17.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou create a knowledge store for Azure Cognitive Search by using the following JSON.\n\n\n[Image: https://img.examtopics.com/ai-102/image16.png]\n\n[Image: https://img.examtopics.com/ai-102/image17.png]\n\n\n\nUse the drop-down menus to select the answer choice that completes each statement based on the information presented in the graphic.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image16.png]\n\n[Image: https://img.examtopics.com/ai-102/image17.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 210,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Sortable and Retrievable",
      "Filterable and Retrievable",
      "Searchable and Facetable",
      "Searchable and Retrievable"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You plan create an index for an Azure Cognitive Search service by using the Azure portal. The Cognitive Search service will connect to an Azure SQL database.\n\nThe Azure SQL database contains a table named UserMessages. Each row in UserMessages has a field named MessageCopy that contains the text of social media messages sent by a user.\n\nUsers will perform full text searches against the MessageCopy field, and the values of the field will be shown to the users.\n\nYou need to configure the properties of the index for the MessageCopy field to support the solution.\n\nWhich attributes should you enable for the field?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 211,
    "images": [
      "https://img.examtopics.com/ai-102/image99.png",
      "https://img.examtopics.com/ai-102/image100.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou plan to provision Azure Cognitive Services resources by using the following method.\n\nYou need to create a Standard tier resource that will convert scanned receipts into text.\n\n\n[Image: https://img.examtopics.com/ai-102/image99.png]\n\n[Image: https://img.examtopics.com/ai-102/image100.png]\n\n\n\nHow should you call the method? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image99.png]\n\n[Image: https://img.examtopics.com/ai-102/image100.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 212,
    "images": [
      "https://img.examtopics.com/ai-102/image102.png",
      "https://img.examtopics.com/ai-102/image103.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou have an app named App1 that uses Azure AI Document Intelligence to analyze medical records and provide pharmaceutical dosage recommendations for patients.\n\nYou send a request to App1 and receive the following response.\n\n\n[Image: https://img.examtopics.com/ai-102/image102.png]\n\n[Image: https://img.examtopics.com/ai-102/image103.png]\n\n\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image102.png]\n\n[Image: https://img.examtopics.com/ai-102/image103.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 213,
    "images": [
      "https://img.examtopics.com/ai-102/image105.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou have an Azure subscription that contains an Azure AI Document Intelligence resource named DI1.\n\nYou build an app named App1 that analyzes PDF files for handwritten content by using DI1.\n\nYou need to ensure that App1 will recognize the handwritten content.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\n\n[Image: https://img.examtopics.com/ai-102/image105.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 214,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Lower the confidence score threshold of App1.",
      "Create a new training set and add the additional contract format to the new training set. Create and train a new custom model.",
      "Add the additional contract format to the existing training set. Retrain the model.",
      "Lower the accuracy threshold of App1."
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have an app named App1 that uses a custom Azure AI Document Intelligence model to recognize contract documents.\n\nYou need to ensure that the model supports an additional contract format. The solution must minimize development effort.\n\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 215,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Regenerate the primary admin key, change the app to use the secondary admin key, and then regenerate the secondary admin key.",
      "Change the app to use a query key, and then regenerate the primary admin key and the secondary admin key.",
      "Regenerate the secondary admin key, change the app to use the secondary admin key, and then regenerate the primary key.",
      "Add a new query key, change the app to use the new query key, and then delete all the unused query keys."
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You deploy a web app that is used as a management portal for indexing in Azure Cognitive Search. The app is configured to use the primary admin key.\nDuring a security review, you discover unauthorized changes to the search index. You suspect that the primary access key is compromised.\nYou need to prevent unauthorized access to the index management endpoint. The solution must minimize downtime.\nWhat should you do next?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 216,
    "images": [
      "https://img.examtopics.com/ai-102/image138.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription.\n\nYou need to deploy an Azure AI Document Intelligence resource.\n\nHow should you complete the Azure Resource Manager (ARM) template? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image138.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 217,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "custom extraction model",
      "contract",
      "invoice",
      "general document"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You are building an app named App1 that will use Azure AI Document Intelligence to extract the following data from scanned documents:\n\n• Shipping address\n• Billing address\n• Customer ID\n• Amount due\n• Due date\n• Total tax\n• Subtotal\n\nYou need to identify which model to use for App1. The solution must minimize development effort.\n\nWhich model should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 218,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Migrate the data in HR to Azure Blob storage.",
      "Migrate the data in HR to the on-premises SQL server.",
      "Export the data in Finance to Azure Data Lake Storage.",
      "Migrate the data in Sales to the MongoDB API."
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have the following data sources:\n\n• Finance: On-premises Microsoft SQL Server database\n• Sales: Azure Cosmos DB using the Core (SQL) API\n• Logs: Azure Table storage\n• HR: Azure SQL database\n\nYou need to ensure that you can search all the data by using the Azure AI Search REST API.\n\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 219,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "the prebuilt Read model",
      "a custom template model",
      "a custom neural model",
      "the prebuilt receipt model"
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You are building an app that will process scanned expense claims and extract and label the following data:\n\n• Merchant information\n• Time of transaction\n• Date of transaction\n• Taxes paid\n• Total cost\n\nYou need to recommend an Azure AI Document Intelligence model for the app. The solution must minimize development effort.\n\nWhat should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 220,
    "images": [
      "https://img.examtopics.com/ai-102/image156.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou are building a language learning solution.\n\nYou need to recommend which Azure services can be used to perform the following tasks:\n\n• Analyze lesson plans submitted by teachers and extract key fields, such as lesson times and required texts.\n• Analyze learning content and provide students with pictures that represent commonly used words or phrases in the text.\n\nThe solution must minimize development effort.\n\nWhich Azure service should you recommend for each task? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image156.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 221,
    "images": [
      "https://img.examtopics.com/ai-102/image174.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription.\n\nYou plan to build a solution that will analyze scanned documents and export relevant fields to a database.\n\nYou need to recommend which Azure AI service to deploy for the following types of documents:\n\n• Internal expenditure request authorization forms\n• Supplier invoices\n\nThe solution must minimize development effort.\n\nWhat should you recommend for each document type? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image174.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 222,
    "images": [
      "https://img.examtopics.com/ai-102/image158.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou have an Azure subscription that contains an Azure AI Document Intelligence resource named DI1.\n\nYou create a PDF document named Test.pdf that contains tabular data.\n\nYou need to analyze Test.pdf by using DI1.\n\nHow should you complete the command? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image158.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 223,
    "images": [],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Azure AI Immersive Reader",
      "Azure OpenAI",
      "Azure AI Document Intelligence",
      "Azure AI Custom Vision"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have an Azure AI Search resource named Search1.\n\nYou have an app named App1 that uses Search1 to index content.\n\nYou need to add a custom skill to App1 to ensure that the app can recognize and retrieve properties from invoices by using Search1.\n\nWhat should you include in the solution?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 224,
    "images": [
      "https://img.examtopics.com/ai-102/image176.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT\n-\n\nYou have an Azure subscription.\n\nYou plan to build a solution that will analyze scanned documents and export relevant fields to a database.\n\nYou need to recommend an Azure AI Document Intelligence model for the following types of documents:\n\n• Expenditure request authorization forms\n• Structured and unstructured survey forms\n• Structured employment application forms\n\nThe solution must minimize development effort and costs.\n\nWhich type of model should you recommend for each document type? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image176.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 225,
    "images": [
      "https://img.examtopics.com/ai-102/image178.png"
    ],
    "explanation": "E",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "File1, File2, and File4 only",
      "File2, and File5 only",
      "File2, File4, and File5 only",
      "File1, File2, File3, File4, and File5",
      "File1 and File2 only"
    ],
    "correct": [
      4
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an Azure AI Document Intelligence resource named AIdoc1 in the S0 tier.\n\nYou have the files shown in the following table.\n\n\n[Image: https://img.examtopics.com/ai-102/image178.png]\n\n\n\nYou need to train a custom extraction model by using AIdoc1.\n\nWhich files can you upload to Document Intelligence Studio?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 226,
    "images": [
      "https://img.examtopics.com/ai-102/image179.png"
    ],
    "explanation": "C",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "File 1.pdf only",
      "File2.jpg only",
      "File3.tiff only",
      "File2.jpg and File3.tiff only",
      "File1.pdf, File2.jpg, and File3.tiff"
    ],
    "correct": [
      2
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an Azure AI Document Intelligence resource named DI1. DI1 uses the Standard S0 pricing tier.\n\nYou have the files shown in the following table.\n\n\n[Image: https://img.examtopics.com/ai-102/image179.png]\n\n\n\nWhich files can you analyze by using DI1?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 227,
    "images": [],
    "explanation": "D",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Split the data into multiple blob containers. Create a Cognitive Search service for each container. Within each indexer definition, schedule the same runtime execution pattern.",
      "Split the data into multiple blob containers. Create an indexer for each container. Increase the search units. Within each indexer definition, schedule a sequential execution pattern.",
      "Create a Cognitive Search service for each type of document.",
      "Split the data into multiple virtual folders. Create an indexer for each folder. Increase the search units. Within each indexer definition, schedule the same runtime execution pattern."
    ],
    "correct": [
      3
    ],
    "multiple": false,
    "text": "You have an existing Azure Cognitive Search service.\nYou have an Azure Blob storage account that contains millions of scanned documents stored as images and PDFs.\nYou need to make the scanned documents available to search as quickly as possible.\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 228,
    "images": [
      "https://img.examtopics.com/ai-102/image180.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\n\nYou have an Azure subscription that contains an Azure AI Document Intelligence resource named DI1.\n\nYou build an app named App1 that analyzes PDF files for handwritten content by using DI1.\n\nYou need to ensure that App1 will recognize the handwritten content.\n\nHow should you complete the code? To answer, select the appropriate options in the answer area.\n\nNOTE: Each correct selection is worth one point.\n\n\n[Image: https://img.examtopics.com/ai-102/image180.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 229,
    "images": [
      "https://img.examtopics.com/ai-102/image182.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou have an Azure subscription that contains a storage account named sa1 and an Azure AI Document Intelligence resource named DI1.\n\nYou need to create and train a custom model in DI1 by using Document Intelligence Studio. The solution must minimize development effort.\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\n\n[Image: https://img.examtopics.com/ai-102/image182.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 230,
    "images": [
      "https://img.examtopics.com/ai-102/image184.png"
    ],
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP\n-\n\nYou have an Azure subscription that contains an Azure AI Document Intelligence resource named DI1 and a storage account named sa1. The sa1 account contains a blob container named blob1 and an Azure Files share named share1.\n\nYou plan to build a custom model named Model1 in DI1.\n\nYou create sample forms and JSON files for Model1.\n\nYou need to train Model1 and retrieve the ID of the model.\n\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\n\nNOTE: More than one order of answer choices is correct. You will receive credit for any of the correct orders you select.\n\n\n[Image: https://img.examtopics.com/ai-102/image184.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 231,
    "images": [],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Upgrade the business card model to v3.0.",
      "Implement the read model.",
      "Deploy a custom model.",
      "Implement the contract model."
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have an Azure subscription that contains an Azure AI Document Intelligence resource named AIdoc1.\n\nYou have an app named App1 that uses AIdoc1. App1 analyzes business cards by calling business card model v2.1.\n\nYou need to update App1 to ensure that the app can interpret QR codes. The solution must minimize administrative effort.\n\nWhat should you do first?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 232,
    "images": [],
    "explanation": "ABE",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "tableName",
      "generatedKeyName",
      "dataSource",
      "dataSourceConnection",
      "source"
    ],
    "correct": [
      0,
      1,
      4
    ],
    "multiple": true,
    "text": "You need to implement a table projection to generate a physical expression of an Azure Cognitive Search index.\nWhich three properties should you specify in the skillset definition JSON configuration table node? Each correct answer presents part of the solution.\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 233,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0019300001.png"
    ],
    "explanation": "Box 1: Object projection -\nObject projections are JSON representations of the enrichment tree that can be sourced from any node.\n\nBox 2: File projection -\nFile projections are similar to object projections and only act on the normalized_images collection.\nReference:\nhttps://docs.microsoft.com/en-us/azure/search/knowledge-store-projection-overview",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are creating an enrichment pipeline that will use Azure Cognitive Search. The knowledge store contains unstructured JSON data and scanned PDF documents that contain text.\nWhich projection type should you use for each data type? To answer, select the appropriate options in the answer area.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0019300001.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 234,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0019500001.jpg",
      "https://www.examtopics.com/assets/media/exam-media/04271/0019500002.png"
    ],
    "explanation": "Box 1: Yes -\nOnce you have defined a skillset, you must map the output fields of any skill that directly contributes values to a given field in your search index.\n\nBox 2: Yes -\nThe definition is a custom skill that calls a web API as part of the enrichment process.\n\nBox 3: No -\nFor each organization identified by entity recognition, this skill calls a web API to find the description of that organization.\nReference:\nhttps://docs.microsoft.com/en-us/azure/search/cognitive-search-output-field-mapping",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "HOTSPOT -\nYou are building an Azure Cognitive Search custom skill.\nYou have the following custom skill schema definition.\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0019500001.jpg]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0019500002.png]\n\n\nFor each of the following statements, select Yes if the statement is true. Otherwise, select No.\nNOTE: Each correct selection is worth one point.\nHot Area:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0019500001.jpg]\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0019500002.png]\n",
    "questionKind": "hotspot",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 235,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0019600005.png"
    ],
    "explanation": "B",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Configure multiple read replicas for the data in Sales.",
      "Mirror Finance to an Azure SQL database.",
      "Ingest the data in Logs into Azure Data Explorer.",
      "Ingest the data in Logs into Azure Sentinel."
    ],
    "correct": [
      1
    ],
    "multiple": false,
    "text": "You have the following data sources:\n✑ Finance: On-premises Microsoft SQL Server database\n✑ Sales: Azure Cosmos DB using the Core (SQL) API\n✑ Logs: Azure Table storage\n\nHR: Azure SQL database -\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0019600005.png]\n\n\nYou need to ensure that you can search all the data by using the Azure Cognitive Search REST API.\nWhat should you do?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 236,
    "images": [],
    "explanation": "A",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "keyPhrases",
      "sentiment",
      "languages",
      "entities/recognition/general"
    ],
    "correct": [
      0
    ],
    "multiple": false,
    "text": "You are developing a solution to generate a word cloud based on the reviews of a company's products.\nWhich Text Analytics REST API endpoint should you use?",
    "questionKind": "mc"
  },
  {
    "topic": "4",
    "domainId": "knowledge-mining",
    "questionId": 237,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0019800001.png"
    ],
    "explanation": "Reference:\nhttps://docs.microsoft.com/en-us/azure/search/search-security-api-keys",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou have a web app that uses Azure Cognitive Search.\nWhen reviewing billing for the app, you discover much higher than expected charges. You suspect that the query key is compromised.\nYou need to prevent unauthorized access to the search endpoint and ensure that users only have read only access to the documents collection. The solution must minimize app downtime.\nWhich three actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0019800001.png]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  },
  {
    "topic": "8",
    "domainId": "knowledge-mining",
    "questionId": 322,
    "images": [],
    "explanation": "CD",
    "quizEligible": true,
    "type": "mc",
    "choices": [
      "Azure AI Document Intelligence",
      "Microsoft Defender for Cloud Apps",
      "Azure AI Content Safety",
      "Azure AI Vision",
      "Azure AI Custom Vision"
    ],
    "correct": [
      2,
      3
    ],
    "multiple": true,
    "text": "You have an Azure subscription.\n\nYou are building a social media app that will enable users to share images.\n\nYou need to ensure that inappropriate content uploaded by the users is blocked. The solution must minimize development effort.\n\nWhat are two tools that you can use? Each correct answer presents a complete solution.\n\nNOTE: Each correct selection is worth one point.",
    "questionKind": "mc"
  },
  {
    "topic": "9",
    "domainId": "knowledge-mining",
    "questionId": 329,
    "images": [
      "https://www.examtopics.com/assets/media/exam-media/04271/0011600001.jpg"
    ],
    "explanation": "Scenario: All videos must have transcripts that are associated to the video and included in product descriptions.\nProduct descriptions, transcripts, and alt text must be available in English, Spanish, and Portuguese.\nStep 1: Upload the video to blob storage\nGiven a video or audio file, the file is first dropped into a Blob Storage. T\nStep 2: Index the video by using the Video Indexer API.\nWhen a video is indexed, Video Indexer produces the JSON content that contains details of the specified video insights. The insights include: transcripts, OCRs, faces, topics, blocks, etc.\nStep 3: Extract the transcript from the Video Indexer API.\nStep 4: Translate the transcript by using the Translator API.\nReference:\nhttps://azure.microsoft.com/en-us/blog/get-video-insights-in-even-more-languages/ https://docs.microsoft.com/en-us/azure/media-services/video-indexer/video-indexer-output-json-v2",
    "quizEligible": false,
    "type": "interactive",
    "choices": [],
    "correct": [],
    "multiple": false,
    "text": "DRAG DROP -\nYou are planning the product creation project.\nYou need to recommend a process for analyzing videos.\nWhich four actions should you perform in sequence? To answer, move the appropriate actions from the list of actions to the answer area and arrange them in the correct order.\nSelect and Place:\n\n[Image: https://www.examtopics.com/assets/media/exam-media/04271/0011600001.jpg]\n",
    "questionKind": "drag-drop",
    "warn": "Interactive question — review in library only."
  }
];

export const ai102ExamMeta = {
  "examCode": "AI-102",
  "total": 330,
  "quizEligible": 178,
  "sourceFiles": 66,
  "domainStats": {
    "plan-manage": {
      "total": 45,
      "quizEligible": 31,
      "examTopics": {
        "1": 31,
        "3": 1,
        "8": 10,
        "9": 1,
        "15": 2
      }
    },
    "generative-ai": {
      "total": 26,
      "quizEligible": 12,
      "examTopics": {
        "1": 3,
        "6": 1,
        "7": 21,
        "8": 1
      }
    },
    "computer-vision": {
      "total": 80,
      "quizEligible": 39,
      "examTopics": {
        "1": 5,
        "2": 37,
        "3": 4,
        "5": 32,
        "6": 1,
        "10": 1
      }
    },
    "nlp": {
      "total": 114,
      "quizEligible": 57,
      "examTopics": {
        "1": 14,
        "3": 71,
        "4": 2,
        "5": 19,
        "7": 4,
        "8": 1,
        "11": 1,
        "14": 1,
        "15": 1
      }
    },
    "knowledge-mining": {
      "total": 65,
      "quizEligible": 39,
      "examTopics": {
        "1": 18,
        "2": 5,
        "3": 3,
        "4": 31,
        "8": 1,
        "9": 1,
        "10": 1,
        "12": 1,
        "13": 1,
        "14": 3
      }
    }
  },
  "partSizes": [
    45,
    26,
    0,
    80,
    114,
    65
  ],
  "partStarts": [
    0,
    45,
    71,
    71,
    151,
    265
  ],
  "partTitles": [
    "Plan and manage an Azure AI solution",
    "Implement generative AI solutions",
    "Implement an agentic solution",
    "Implement computer vision solutions",
    "Implement natural language processing solutions",
    "Implement knowledge mining and information extraction"
  ],
  "partDomains": [
    "plan-manage",
    "generative-ai",
    "agentic",
    "computer-vision",
    "nlp",
    "knowledge-mining"
  ],
  "topics": [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15"
  ],
  "GRID_PAGE_SIZE": 50
};
