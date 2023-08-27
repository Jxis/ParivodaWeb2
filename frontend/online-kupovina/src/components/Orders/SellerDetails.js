import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import { OrderDetailsModel } from "../../models/OrderDetailsModel";
import { GetSellerOrderDetails } from "../../services/OrderService";

function SellerDetails({ open, handleClose, orderId }) {
  const [details, setDetails] = useState(new OrderDetailsModel());
  const [errorMessage, setErrorMessage] = useState("");

  const getSellerOrderDetails = async (orderId) => {
    try {
      const resp = await GetSellerOrderDetails(orderId);
      setDetails(resp);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (open) {
        getSellerOrderDetails(orderId);
    }
  }, [open, orderId]);

  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Ordered Items</DialogTitle>
    <DialogContent>
      {details && details.length > 0 ? (
        <div className=" m-12">
          {details.map((item, index) => (
            <div className="flex flex-col gap-1 py-4 border-t border-b border-gray-300">
                <img
                  className="item-image"
                  alt=""
                  src={`https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80`}
                  style={{ width: '50px', height: '50px' }}
                />
              <span>Name: {item.name}</span>
              <span>Description: {item.description}</span>
              <span>Price: {item.price} rsd</span>
              <span>Quantity: {item.itemQuantity}</span>
            </div>
          ))}
        </div>
              
              
            
        
      ) : (
        <p>No items found</p>
      )}
      {errorMessage && <h3>{errorMessage}</h3>}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
  );
}

export default SellerDetails;