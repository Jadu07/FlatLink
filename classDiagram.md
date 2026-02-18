# FlatLink Class Structure

```mermaid
classDiagram
    %% Core User Entity
    class User {
        +UUID userId
        +String email
        +String passwordHash
        +String fullName
        +String college
        +String company
        +String bio
        +Float budgetRange
        +GeoLocation location
        +register()
        +login()
        +updateProfile()
        +searchUsers(Filters filters)
    }

    %% Connection Logic
    class ConnectionRequest {
        +UUID requestId
        +UUID senderId
        +UUID receiverId
        +Date createdAt
        +RequestStatus status
        +send()
        +accept()
        +reject()
    }

    %% Messaging System
    class ChatRoom {
        +UUID roomId
        +UUID user1_Id
        +UUID user2_Id
        +Date createdAt
        +Boolean isActive
        +createRoom()
        +archive()
    }

    class Message {
        +UUID messageId
        +UUID roomId
        +UUID senderId
        +String content
        +Date timestamp
        +Boolean isRead
        +send()
        +markAsRead()
    }

    %% Enumerations
    class RequestStatus {
        <<enumeration>>
        PENDING
        ACCEPTED
        REJECTED
    }

    %% Relationships
    User "1" --> "*" ConnectionRequest : sends/receives
    User "1" --> "*" ChatRoom : participates_in
    ChatRoom "1" *-- "*" Message : contains
    ConnectionRequest ..> ChatRoom : initiates (on accept)
    User "1" --> "*" Message : writes
