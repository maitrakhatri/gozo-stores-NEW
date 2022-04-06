import { useNavigate } from "react-router-dom"
import { useCart } from "../context/cart-context"
import { useWishlist } from "../context/wishlist-context"
import {token} from "../utils/token"
import { Like } from "./Like"

export function Card(props) {

    const {addToCart, myCart} = useCart()
    const navigate = useNavigate()

    const {addToWishlist, deleteFromWishlist, myWishlist, productInWishlist} = useWishlist()

    const {productInCart} = useCart()

    const thisInWishlist = productInWishlist(myWishlist, props.productId)
    const thisInCart = productInCart(myCart, props.productId)

    return (

        <div className="card-component">

            <div className="product-card bg-white">
                <div className="product-image-container">
                    <img className="product-image" src={props.src} alt={props.name} />

                    <Like active={thisInWishlist}  onClick={() => {

                        if(thisInWishlist) {
                            deleteFromWishlist(token, props.productId)
                        }
                        else {
                            addToWishlist(token, props.product)
                        }
                    } } />
                </div>
                <div className="product-card-body">
                    <div className="product-name"> {props.name} <span>({props.rating})</span></div>
                    <div className="product-price"> {props.price} INR </div>
                    <div className="product-action">
                        <button className="btn btn-yellow" onClick={() => {

                            //checks if product is already present in Cart
                            //if yes then redirect to CART page
                            //if not then adds product to cart and
                            //instantly shows GOT TO CART button
                            if(thisInCart) {
                                navigate('/cart')
                            }
                            else {
                                addToCart(token, props.product)
                            }
                        }}>{thisInCart ? "Go to Cart" : "Add to Cart"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
