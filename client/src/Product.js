import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class Product extends Component  {

   constructor(props) {
   super(props);
   this.state = {
     availableOnline: false,
     availableInstore: false,
     imageUrl: this.props.item.Images[0].PrimaryImage[0].image,
     imageUrls: [],
     currentImageIndex: 0
     }

      this.getNextImage = this.getNextImage.bind(this);
      this.getLastImage = this.getLastImage.bind(this);
   }

   componentDidMount() {
     this.checkChannelAvailability(this.props.item)
     this.grabImageUrls();
   }

   checkChannelAvailability(item){
     if (item.purchasingChannelCode === "0" || item.purchasingChannelCode === "1") {
       this.setState({ availableOnline: true });
     } else if (item.purchasingChannelCode === "0" || item.purchasingChannelCode === "2"){
       this.setState({ availableInstore: true });
     }
   }

   grabImageUrls(item){
     let urlArray = []
     urlArray.push(this.props.item.Images[0].PrimaryImage[0].image)
     {this.props.item.Images[0].AlternateImages.map(function(image){
       urlArray.push(image)
      })}
      this.setState({ imageUrls: urlArray });
      return urlArray;
   }

   getLastImage(){
     let array = this.grabImageUrls(this.props.item)
     const lastIndex = array.length - 1;
     const { currentImageIndex } = this.state;
     const shouldResetIndex = currentImageIndex === 0;
     const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;
     let newUrl = array[this.state.currentImageIndex].image

     this.setState({imageUrl: newUrl, currentImageIndex: index})
   }

   getNextImage(){
     let array = this.grabImageUrls(this.props.item)
     const lastIndex = array.length - 1;
     const { currentImageIndex } = this.state;
     const shouldResetIndex = currentImageIndex === lastIndex;
     const index =  shouldResetIndex ? 0 : currentImageIndex + 1;
     let newUrl = array[this.state.currentImageIndex].image

     this.setState({imageUrl: newUrl, currentImageIndex: index })
   }

 render(){
   const online = this.state.availableOnline;
   const instore = this.state.availableInstore;

   return (
     <div id="productPageContainer" className="textAlignLeft">

      <div id="topRowFlexContainer">

        <section id="titleAndImagesBlock" className="textAlignCenter">
          <h2 className="grayText">{this.props.item.title}</h2>
          <BigImage url={this.state.imageUrl} alt={this.props.item.title} title={this.props.item.title}/>
          <div className="flexCenter">
            <CarouselArrow whenClicked={this.getLastImage} arrow="&#9664;"/>
            <CarouselArrow whenClicked={this.getNextImage} arrow="&#9654;"/>
          </div>
        </section>

        <section id="priceButtonsAndHighlightsBlock">
          <div>
          <span className="smallRightMargin text24px">{this.props.item.Offers[0].OfferPrice[0].formattedPriceValue}</span><span className="grayText text10px">{this.props.item.Offers[0].OfferPrice[0].priceQualifier}</span>
          </div>
          <hr />
          <ul>
          {this.props.item.Promotions.map(function(promotion){
              return <li className="redText text14px">{promotion.Description[0].shortDescription}</li>;
            })}
          </ul>
          <hr />
          {instore &&
            <StoreButton />
          }
          {online &&
            <CartButton />
          }

        </section>
      </div>

        <section id="reviewsBlock">

        </section>

     </div>
   )
 }
 }

 function StoreButton(props) {
  return (
    <button className="whiteText blackBkg text18px smallRightMargin">
      PICK UP IN STORE
    </button>
  );
}

function CartButton(props) {
 return (
    <button className="whiteText redBkg text18px">
      ADD TO CART
    </button>
 );
}

function BigImage(props) {
 return (
   <img src={props.url} alt={props.alt} title={props.title} />
 );
}

function CarouselArrow(props) {
  return (
    <div onClick={props.whenClicked}>
      {props.arrow}
    </div>
  );
}

export default Product;
