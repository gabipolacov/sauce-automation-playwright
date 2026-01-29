This set of automated test cases contains:
•	Login test: Verifies that the user is able to log in successfully and validates that the user is redirected to the '/inventory.html' page. This logic is executed in a 'beforeEach' hook to ensure that all tests start from a logged-in state and remain independent from each other.
•	Add items to cart test: Verifies that the user can add items to the cart correctly. When selecting products from the catalog, the product names are stored in variables and later validated in the cart to ensure the correct items were added. Additionally, this test validates that the cart badge displays the correct number of added products.
•	Checkout items test: Verifies that the user is not able to proceed with the checkout process without providing the required checkout information. An error message is expected to be displayed when attempting to continue without filling in the mandatory fields.
The tests are grouped using 'test.describe.serial' to keep the purchase flow tests organized and easy to follow.

Challenges Encountered

•	Initial test design assumed execution order, this was corrected by using 'beforeEach' to ensure each test starts from a clean state.
•	Some selectors matched multiple elements, which caused test failures. This was fixed by using more specific selectors.
•	Assertions were initially applied to string values instead of locators, which caused unreliable test results. This was fixed by asserting directly on locators.
•	Cart state does not persist between tests due to isolated browser contexts, so required setup (adding items) was repeated where needed.
•	More complex implementations were considered but simplified to keep the tests clear, readable, and appropriate for a technical challenge. For example, adding products to the cart using for loop and dynamic counters to assert the number of items added to the cart was considered, but a direct and explicit approach was chosen for the technical challenge.
