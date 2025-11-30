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