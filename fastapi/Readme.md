# Ecommerce API Documentation (FastAPI)

## Features and Modules

### 1. User Authentication

- [x] **Login and Registration**
- [x] **Get Current Users**
- [x] **JWT Authentication** (returns token)
- [ ] **Role Based Authentication and Access**

---

### 2. User Management Module

- [ ] **Manage User Profiles**: Update and retrieve user details.
- [ ] **Delete User Accounts**
- [ ] **Design the models (users and profile)** - [ ] **User Model**: username, email, password, role - [ ] **Profile Model**: - [ ] **(relationship)**

---

### 3. Product Management Module

- [ ] **Add Products** (Admin only).
- [ ] **Update Product Details** (Admin only).
- [ ] **List All Products**.
- [ ] **Get Product Details**.
- [ ] **Search Products**.
- [ ] **Delete Products** (Admin only).

---

### 4. Cart Management Module

- [ ] **Add Items to Cart**.
- [ ] **View Cart**.
- [ ] **Update Cart Item Quantities**.
- [ ] **Remove Items from Cart**.

---

### 5. Order Management Module

- [ ] **Create Orders**.
- [ ] **Get Order History**.
- [ ] **Get Order Details**.
- [ ] **Update Order Status** (Admin only).

---

### 6. Payment Module

- [ ] **Initiate Payments for Orders**.
- [ ] **Get Payment Status**.
- [ ] **Update Payment Details** (Admin only).

---

### 7. Admin Module

- [ ] **Manage Users**: View, update, or delete users.
- [ ] **Manage Products**: Add, update, or delete products.
- [ ] **Manage Orders**: View and update all orders.
- [ ] **View System Stats** (e.g., total sales, users).

---

## API Endpoints

### Authentication Endpoints

- [ ] `POST /auth/register`: Register a new user.
- [ ] `POST /auth/login`: Login and get a JWT token.
- [ ] `GET /auth/profile`: Retrieve the current user profile (requires authentication).

---

### User Management Endpoints

- [ ] `GET /users/{user_id}`: Get details of a specific user.
- [ ] `PUT /users/{user_id}`: Update user details.
- [ ] `DELETE /users/{user_id}`: Delete a user account.

---

### Product Management Endpoints

- [ ] `POST /products`: Add a new product (Admin only).
- [ ] `GET /products`: List all products.
- [ ] `GET /products/{product_id}`: Get product details.
- [ ] `PUT /products/{product_id}`: Update product details (Admin only).
- [ ] `DELETE /products/{product_id}`: Delete a product (Admin only).

---

### Cart Management Endpoints

- [ ] `POST /cart`: Add items to the cart.
- [ ] `GET /cart`: View the user's cart.
- [ ] `PUT /cart/{item_id}`: Update item quantity in the cart.
- [ ] `DELETE /cart/{item_id}`: Remove an item from the cart.

---

### Order Management Endpoints

- [ ] `POST /orders`: Create a new order.
- [ ] `GET /orders`: Get the user's order history.
- [ ] `GET /orders/{order_id}`: Get details of a specific order.
- [ ] `PUT /orders/{order_id}`: Update the order status (Admin only).

---

### Payment Endpoints

- [ ] `POST /payments`: Initiate a payment for an order.
- [ ] `GET /payments/{payment_id}`: Get payment status.
- [ ] `PUT /payments/{payment_id}`: Update payment details (Admin only).

---

### Admin Endpoints

- [ ] `GET /admin/stats`: View system stats (e.g., total sales, users).
- [ ] `GET /admin/orders`: View all orders.
- [ ] `GET /admin/users`: View all users.

---

## Running the Application

To start the FastAPI application, run the following command:

```bash
uvicorn index:app --reload
```
