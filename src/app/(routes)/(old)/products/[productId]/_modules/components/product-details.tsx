"use client";
import { formatter } from "@/utils/formatters";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import useCart from "@/hooks/useCartStore";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  new: boolean;
  discount: number;
  quantity: number;
};

export default function ProductDetails({
  intialData,
}: {
  intialData: Product;
}) {
  const { 
    items, 
    addItem, 
    getItemCount, 
    updateItemCount, 
    removeItem 
  } = useCart();

  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [remainingStock, setRemainingStock] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  // useEffect to synchronize remainingStock state with the cart and product data
  useEffect(() => {
    // Get the current count of this product in the cart
    const currentCartQuantity = getItemCount(intialData.id);

    // Update the state with the current item count
    setCartQuantity(currentCartQuantity);

    // Calculate and update the available stock
    setRemainingStock(intialData.quantity - currentCartQuantity);

    // Set the initial count to the current item count if it exists, otherwise default to 1
    setSelectedQuantity(currentCartQuantity > 0 ? currentCartQuantity : 1);
  }, [intialData, items, getItemCount]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > intialData.quantity) {
      toast.error(`Only ${intialData.quantity} items available.`);
      return;
    }
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1.");
      return;
    }
    setSelectedQuantity(newQuantity);
    
    // Only update cart if item is already in cart
    if (cartQuantity > 0) {
      updateItemCount(intialData.id, newQuantity);
    }
  };

  // Handler for adding or removing the product from the cart
  const handleCartAction = () => {
    if (cartQuantity > 0) {
      removeItem(intialData.id);
      toast.info('Item removed from cart.');
    } else if (remainingStock !== 0) {
      addItem(intialData, selectedQuantity);
    } else {
      toast.error(`Only ${intialData.quantity} items available.`);
    }
  };

  const discountedPrice = intialData.discount
    ? intialData.price - (intialData.price * intialData.discount) / 100
    : intialData.price;

  return (
    <div className="w-max">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm text-orange-500 font-semibold uppercase">
            Sneaker Company
          </p>

          <h1 className="text-4xl font-bold">{intialData?.title}</h1>

          <p className="text-gray-600">{intialData?.description}</p>
        </div>

        <div className="space-y-4">
          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {formatter.format(discountedPrice)}
              </span>

              {intialData.discount > 0 && (
                <Badge className="text-md px-2 py-0.5">
                  -{intialData.discount}%
                </Badge>
              )}
            </div>

            {/* Original Price Strikethrough */}
            {intialData.discount > 0 && (
              <span className="text-sm line-through text-gray-500">
                {formatter.format(intialData.price)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div>
            {remainingStock === 0 ? (
              <p className="text-red-500 text-sm">This product is out of stock.</p>
            ) : (
              <p className="text-gray-500 text-sm">{remainingStock} items available</p>
            )}
          </div>

          {/* Quantity + Add to cart */}
          <div
            className="flex flex-col sm:flex-row
         justify-center md:justify-start gap-4"
          >
            {/* Quantity */}
            <div className="flex items-center mx-auto border rounded-md w-min">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(selectedQuantity - 1)}
                disabled={selectedQuantity <= 1}
              >
                <Minus className="size-4" />
              </Button>

              <span className="px-3">{selectedQuantity}</span>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(selectedQuantity + 1)}
                disabled={selectedQuantity >= intialData.quantity}
              >
                <Plus className="size-4" />
              </Button>
            </div>
            
            {/* Add to cart */}
            <Button 
              className="flex-1"
              onClick={handleCartAction}
              disabled={remainingStock === 0}
              variant={cartQuantity > 0 ? "destructive" : "default"}
            >
              <span className="flex items-center gap-2">
                {cartQuantity > 0 ? (
                  <>
                    <X className="size-5" />
                    Remove from cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-5" />
                    Add to cart
                  </>
                )}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}