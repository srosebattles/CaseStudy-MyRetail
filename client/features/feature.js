Feature: CartButton

Scenario: Item is Available Online
When rendering <CartButton online=true />
Then the button with text "ADD TO CART" is rendered

Scenario: Item is Not Available Online
When rendering <CartButton online=false />
Then the button with text "ADD TO CART" is not rendered
