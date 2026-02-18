# FlatLink Use Case Diagram

```mermaid
graph LR
    %% Actors
    User((User))
    System[System Database/API]

    %% System Boundary
    subgraph FlatLink_Platform [FlatLink Platform]
        direction TB
        UC1(Register/Login)
        UC2(Manage Profile)
        UC3(Search Flatmates)
        UC4(Send Connection Request)
        UC5(Accept/Reject Request)
        UC6(Secure Chat)
        UC7(Receive Notifications)
    end


    %% User Interactions
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6

    %% System Interactions (Backend Logic)
    UC3 -.->|Query DB| System
    UC4 -.->|Validate & Notify| System
    UC5 -.->|Update Status| System
    UC6 -.->|Real-time Delivery| System
    UC7 -.->|Email/Push| System

    %% Dependencies
    UC6 -.->|Requires| UC5
    UC4 -.->|From Search| UC3
