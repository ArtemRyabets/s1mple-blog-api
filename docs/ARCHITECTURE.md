#  Архітектура проекту SimpleBlog

Цей документ описує високорівневу структуру бекенд-додатку, схему бази даних та основні потоки даних.

## 1. Компонентна діаграма (High-Level Design)

Додаток побудовано за Шаруватою архітектурою (Layered Architecture). Це забезпечує слабку зв'язність компонентів та легкість у тестуванні.

```mermaid
graph TD
    Client["Клієнт (Browser / Postman)"] -->|HTTP Request| Router["Router (API Routes)"]
    
    subgraph "Backend Application"
        Router --> Controller[Controller Layer]
        Controller --> Service["Service Layer (Business Logic)"]
        Service --> Repository["Repository Layer (Data Access)"]
    end
    
    Repository -->|SQL Queries| DB[("PostgreSQL Database")]

    %% Стилі
    style Client fill:#f9f,stroke:#333
    style DB fill:#bbf,stroke:#333



---

## 2. Структура Бази Даних (ER Diagram)

Схема даних для реалізації функціоналу блогу.

```mermaid
erDiagram
    POST ||--o{ COMMENT : "has"
    
    POST {
        string id PK "Unique ID"
        string title "Title"
        string content "Content Body"
        string author "Author Name"
        datetime created_at "Created Date"
    }

    COMMENT {
        string id PK "Unique ID"
        string text "Comment Text"
        string post_id FK "Post Link"
        datetime created_at "Created Date"
    }