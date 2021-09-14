# Assignment
Create an application for building workflows. A workflow can be depicted as a sequence of operations designed to perform one or more simple or complex mechanisms. This application should provide functionality for reading and creating workflows by using definitions of external services and their features.

### As a user of that system, I should be able to:
- Login to the application
- Build workflows containing sub-processes (features from external services)
- Browse through a list of all external services and their features
- Use all features from external services in their workflows

### Each user has the following information:
- id - number
- created - date
- lastUpdated - date
- username - required
- password - required

### Each external service’s feature (workflow) has the following information:
- id - number
- created - date
- lastUpdated - date
- path - required
- name - required
- displayName - optional
- description - optional

### Technology stack for the application:
- Angular
- Angular Material
- json-server
- json-server-auth

### Terminology
- Flow
- Integration
- Node
- Parameter

### Data
- You can find a sample json containing data with the format that should be followed here:
- https://drive.google.com/file/d/1ibrpHNJXtNvtOArLyLOlIv4kCIIVaxuV/view?usp=sharing

## Stages
### Stage 1:
Project boilerplate - initialize the application with angular latest version and push it to the repository.
### Stage 2:
Application modules and routes
auth - module containing authentication and login components
main - module containing the rest of the application starting with an empty main component at the beginning
### Stage 3:
Login form in the login page
Authentication request on form submit with success and error handling
### Stage 4:
AuthGuard preventing users from accessing main module before logging-in
NonAuthGuards preventing users from accessing login page after they are logged-in
### Stage 5:
Workflow builder page containing a palette with all the supported integrations
Ability to navigate through the list of integrations (/, /Common/, /Common/Array/, /Slack/, /Atlassian/Jira/, etc)
### Stage 6:
Each flow could be dragged into the “editor” area and dropped on a drop zone
As a result, a block/node should be created
### Stage 7:
Depending on the flow definition, properties of different types are created in the node. For example, port - input of type number; method - select with options “http” and “https”, host - input of type text, etc. Each parameter can be required or optional (also described in the flow definition)
Modify it to work with dynamic components
### Stage 8:
Authentications - a page containing full CRUD on an entity called “authentication”. Based on the services the system supports, each user should be able to create an authentication for each of the services (Slack, Atlassian, etc.). The data object for each service is different and can be fetched from the “authschemas” collection.
Create - users should be able to create their own authentication for the supported services. Here is a sample for reference can be found at the end of the file (the design could be different)
Edit - when an user edits an authentication, the application should never prefill any of the data properties! The “name” of the authentication should not be available for edit. If the user wants to update an authentication, they should provide all the data for that authentication. In short, the application should only prefill the name and the description of the authentication
Delete - the application should ask for confirmation before performing the delete method
Read - the application should show only the authentications for the currently logged-in user!
### Stage 9:
Once the authentications are implemented, the application should show a dropdown with the option to choose one of the authentications for a particular parameter of a node in the workflow editor. There are all the parameters which are defined as “type”: “string” but also have a “meta” property called “authType”. Depending on the value of the “authType” property, the dropdown should contain only authentications for that service! For example, “authKey” parameter of the “/Slack/users/users_conversations” workflow should be a dropdown containing all “Slack” service authentications
### Stage 10:
Let’s make the lives of the users easier - add an option to list all existing and create new authentications from within the workflow editor. We don’t want the user to leave the workflows editor page in order to create a missing authentication… Try to reuse the components for listing and creating authentication as much as possible. A hint - you could have a base class for the listing and simply extend it for two components (AuthenticationsPageComponent [stage 8] and AuthenticationsListDialogComponent [which is going to be loaded from the editor]). See the sample for a reference at the end of the document.
### Stage 11:
Add support for multiple languages in the application using the “ngx-translate” library. The user should be able to change the language from “English” to “Bulgarian” from anywhere in the system and the content should be updated dynamically (without page reload). Note: Data that user fills out - authentication names, values for parameters for nodes, etc. - should not be translated! The translation concerns only hard coded texts in the application - navigation item texts, page titles, action button texts, etc.

*Each stage should be implemented and code reviewed in a separate branch before going on to the next stage!

