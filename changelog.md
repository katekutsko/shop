# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2021-09-13
### Added
- Catalog section for displaying products list
- Cart section for displaying purchased items
- Ability to add items to and remove from cart as well as manipulate their quantity
- Total cost and quantity shown in cart
- Search by item name or description
- Sort cart items by name, quantity or price (for this OrderBy pipe was used)
- Formatting of cart items price was changed to decimal with symbol (Currency pipe was used)
- Product card with details
- 'Not found' page for non-existing pages
- User roles: 'admin' and 'user'
- Admin area (protected by guards): add, edit products
- 'No access' page for protected pages
- Conditional order processing (only when cart is not empty)