import React, { Component } from 'react';
import CartButton from './CartButton.js'
import './App.css';

class Product extends Component  {

   constructor(props) {
   super(props);
   this.state = {
     availableOnline: false,
     availableInstore: false,
     imageUrl: this.props.item.Images[0].PrimaryImage[0].image,
     imageUrls: [],
     currentImageIndex: 0,
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

   return (
     <div id="productPageContainer" className="textAlignLeft">

      <div id="topRowFlexContainer">

        <section id="titleAndImagesBlock" className="textAlignCenter">
          <ItemTitle title={this.props.item.title} />
          <div className="flexCenter">
            <CarouselArrow whenClicked={this.getLastImage} arrow="&#9664;"/>
            <BigImage url={this.state.imageUrl} alt={this.props.item.title} title={this.props.item.title}/>
            <CarouselArrow whenClicked={this.getNextImage} arrow="&#9654;"/>
          </div>
        </section>

        <section id="priceButtonsAndHighlightsBlock">
          <PriceInfo priceInfo={this.props.item.Offers[0].OfferPrice[0]} />

          <Promotions item={this.props.item} />

          <StoreButton instore={this.state.availableInstore} />

          <CartButton online={this.state.availableOnline} />

          <ItemReturnInfo policy={this.props.item.ReturnPolicy[0]} />

          <h1 className="highlightsTitle">product highlights</h1>

          <Highlights highlights={this.props.item.ItemDescription[0].features} />

        </section>
      </div>

        <section id="reviewsBlock">
          <Reviews reviews={this.props.item.CustomerReview[0]} />
        </section>

     </div>
   )
 }
 }

 function ItemTitle(props) {
   return (
   <h2 className="grayText fontWeightNormal">{props.title}</h2>
    );
 }

 function BigImage(props) {
  return (
    <img className="carouselImage" src={props.url} alt={props.alt} title={props.title} />
  );
 }

 function CarouselArrow(props) {
   return (
     <div className="carouselArrowPadding" onClick={props.whenClicked}>
       {props.arrow}
     </div>
   );
 }

 function PriceInfo(props){
   return (
     <div>
      <span className="smallRightMargin text24px">{props.priceInfo.formattedPriceValue}</span>
      <span className="grayText text10px">{props.priceInfo.priceQualifier}</span>
     </div>
   );
 }

 function Promotions(props) {
   return (
   <div>
    <hr />
      <ul>
          {props.item.Promotions.map(function(promotion){
            return <li key={promotion.promotionIdentifier} className="redText text14px">{promotion.Description[0].shortDescription}</li>;
          })}
      </ul>
    <hr />
   </div>
 );
 }

 function StoreButton(props) {
   if (props.instore){
  return (
    <button className="whiteText blackBkg text18px smallLeftMargin">
      PICK UP IN STORE
    </button>
  );
}
  return null;

}

function ItemReturnInfo(props){
  //correct copy wasn't available in the json
  return (
    <div className="flexStart topMargin">
      <div className="grayText text24px returnInfoBorder smallRightPadding">returns</div>
      <div className="grayText text14px smallLeftPadding">
        Most items can be returned within 30 days of purchase. See policy for details.
        <br />
        Prices, promotions, and availabilty may vary.
      </div>
    </div>
  );
}

function Highlights(props) {
  return (
  <ul>
  {props.highlights.map(function(highlight){
    return <li key={highlight} className="grayText text14px smallBottomMargin" dangerouslySetInnerHTML={{__html: highlight}}></li>;
  })}
  </ul>
);
}

function Reviews(props) {
  return (
<div className="reviewsDiv">
    <div className="flex">
        <h4 className="width50 fontWeightNormal">PRO</h4>
        <h4 className="width50 fontWeightNormal">CON</h4>
    </div>
    <hr />
    <div className="flex">
        <p className="text14px width50 smallRightPadding smallLeftPadding">{props.reviews.Pro[0].review}</p>
        <p className="text14px width50 smallRightPadding smallLeftPadding">{props.reviews.Con[0].review}</p>
    </div>
</div>
  );
}

export default Product;
