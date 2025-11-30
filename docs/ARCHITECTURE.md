# Архітектура проекту SimpleBlog

Цей документ описує високорівневу структуру бекенд-додатку, схему бази даних та основні потоки даних.

## 1. Компонентна діаграма (High-Level Design)

Додаток побудовано за Шаруватою архітектурою (Layered Architecture). Це забезпечує слабку зв'язність компонентів та легкість у тестуванні.

```mermaid
graph TD
    Client["Клієнт (Browser / Postman)"] -->|HTTP Request| Router["Router (API Routes)"]
    
    subgraph "Backend Application (Node.js)"
        Router --> Controller[Controller Layer]
        Controller --> Service["Service Layer (Business Logic)"]
        Service --> Repository["Repository Layer (Data Access)"]
    end
    
    Repository -->|SQL Queries| DB[("PostgreSQL Database")]

    %% Опис кольорів для краси
    style Client fill:#f9f,stroke:#333
    style DB fill:#bbf,stroke:#333


    erDiagram
    POST ||--o{ COMMENT : "має (has)"
    
    POST {
        string id PK "Унікальний ідентифікатор"
        string title "Заголовок статті"
        string content "Текст статті"
        string author "Автор"
        datetime created_at "Дата створення"
    }

    COMMENT {
        string id PK "Унікальний ідентифікатор"
        string text "Текст коментаря"
        string post_id FK "Зовнішній ключ на Post"
        datetime created_at "Дата створення"
    }