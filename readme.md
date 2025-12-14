# Phase One Rollout Objectives ( Backend Perspective )

## 📁 1. Auth Module

#### Endpoints

| Method | Endpoint            | Description                              | Status |
| ------ | ------------------- | ---------------------------------------- | ------ |
| POST   | `/auth/signup`      | Create account (email/phone/password)    | ✅     |
| POST   | `/auth/login`       | Login → returns access + refresh tokens  | ✅     |
| POST   | `/auth/logout`      | Invalidate refresh token                 | ✅     |
| POST   | `/auth/request-otp` | Send OTP (email/phone)                   | ✅     |
| POST   | `/auth/verify-otp`  | Verify OTP and mark phone/email verified | ✅     |

## 📁 2. User Module

#### Profile

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | `/user/profile` | Get user profile |
| PUT    | `/user/profile` | Update profile   |

#### Address Management

| Method | Endpoint            | Description    |
| ------ | ------------------- | -------------- |
| GET    | `/user/address`     | List addresses |
| POST   | `/user/address`     | Add address    |
| PUT    | `/user/address/:id` | Update address |
| DELETE | `/user/address/:id` | Remove address |

## 📁 3. Menu Module

#### Public User APIs

| Method | Endpoint           | Description                       |
| ------ | ------------------ | --------------------------------- |
| GET    | `/menu`            | Full restaurant menu              |
| GET    | `/menu/categories` | List all categories               |
| GET    | `/menu/:dishId`    | Get single dish details           |
| GET    | `/menu/search?q=`  | Search dishes by name/ingredients |

#### Admin APIs

| Method | Endpoint                     | Description                |
| ------ | ---------------------------- | -------------------------- |
| POST   | `/admin/menu`                | Add new dish               |
| PUT    | `/admin/menu/:dishId`        | Edit dish                  |
| DELETE | `/admin/menu/:dishId`        | Delete dish                |
| PUT    | `/admin/menu/:dishId/toggle` | Activate / deactivate dish |
| POST   | `/admin/menu/:dishId/upload` | Upload dish image (S3)     |
| PUT    | `/admin/menu/order`          | Reorder menu items         |

## 📁 4. Cart Module

| Method | Endpoint               | Description      |
| ------ | ---------------------- | ---------------- |
| GET    | `/cart`                | Get user cart    |
| POST   | `/cart/add`            | Add item to cart |
| PUT    | `/cart/update`         | Change quantity  |
| DELETE | `/cart/remove/:itemId` | Remove item      |
| DELETE | `/cart/clear`          | Empty cart       |

## 📁 5. Order Module

#### User APIs

| Method | Endpoint                 | Description                    |
| ------ | ------------------------ | ------------------------------ |
| POST   | `/order/create`          | Create order (status: PENDING) |
| GET    | `/order/:orderId`        | Get order details              |
| GET    | `/order`                 | List user orders               |
| POST   | `/order/cancel/:orderId` | Cancel order                   |

#### Admin APIs

| Method | Endpoint                        | Description                                                      |
| ------ | ------------------------------- | ---------------------------------------------------------------- |
| GET    | `/admin/orders`                 | List all orders                                                  |
| GET    | `/admin/orders/:orderId`        | Get order details                                                |
| PUT    | `/admin/orders/:orderId/status` | Update status → PREPARING / READY / OUT_FOR_DELIVERY / COMPLETED |
| POST   | `/admin/orders/:orderId/refund` | Issue refund (optional Phase-1)                                  |

## 📁 6. Payment Module

| Method | Endpoint                   | Description                            |
| ------ | -------------------------- | -------------------------------------- |
| POST   | `/payment/initiate`        | Create payment order (Razorpay/Stripe) |
| POST   | `/payment/verify`          | Verify payment signature               |
| GET    | `/payment/status/:orderId` | Get payment state                      |

## 📁 7. Restaurant Info

#### Public

| Method | Endpoint             | Description                       |
| ------ | -------------------- | --------------------------------- |
| GET    | `/restaurant/info`   | Restaurant name, address, timings |
| GET    | `/restaurant/status` | OPEN / CLOSED                     |

#### Admin

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| PUT    | `/admin/restaurant/status` | Toggle restaurant OPEN/CLOSED |
| PUT    | `/admin/restaurant/info`   | Update description, timings   |

## 📁 8. Search

| Method | Endpoint     | Description                        |
| ------ | ------------ | ---------------------------------- |
| GET    | `/search?q=` | Global search: dishes + categories |

## 📁 9. Analytics (Admin Only)

| Method | Endpoint                              | Description              |
| ------ | ------------------------------------- | ------------------------ |
| GET    | `/admin/analytics/today`              | Today’s orders + revenue |
| GET    | `/admin/analytics/dishes`             | Top-selling dishes       |
| GET    | `/admin/analytics/custom?start=&end=` | Date-range analytics     |
