# shoping-app

1. Homepage:
  a. Carousal.
  b. Dynamic Grid for Clothing.
  c. Dynamic Grid for Accessories.
  d. Product Card click should redirect to Product Details page in the same browser tab.
  e. Use the API Call of Homepage to get the data from the backend. Use the is Accessory property on each 
      item object to render it in separate clothing or accessories section of the homepage.
      
2. Product Details Page:
    a. Render the data dynamically.
    b. Product Preview Image Click should update the left showcase image.
    c. Product Preview Image Click should add a border to the active image.
    d. Add to Cart button click should increase the Cart Count in the topbar. Multiple
       clicks should update the count multiple times.
    e. Cart click in the topbar should redirect to the Checkout page.
    f. Use the API Call of Product Details to get the data from the backend and render it on the page.
    
3. Checkout Page:
    a. Render the product list dynamically.
    b. Render the total amount dynamically.
    c. Place Order button click should send a call to the backend to create a new order.
    d. On order success redirect the page to Order Confirmation page.
    e. Use the API Call for create order when someone clicks on the Place Order button and once we get a 
        success response from the API call then redirect the user to Order Confirmation Page.

4. Order Confirmation Page:
    a. Show a success message.
