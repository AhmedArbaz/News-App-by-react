import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  //ais may ham nay constructor ko use kara this.state kar kay state banatay hain ya bhi daka hay aur change karnay kay liay this.setState kartay hain
  constructor() {
    super();
    console.log("Hello I am a constructor from News components");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  //ya vo method hay jo kay tab run ho ga jab ap ka ya nichay pura component ka render run ho jay ga phir ya run ho ga
  async componentDidMount() {
    console.log("cdm");
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c56478f2069544e28ff421f5dd1c0ce6&pageSize=20";

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults:parsedData.totalResults });
  }

  //Making logic on Next and previous buttons

  handleNextClick = async () => {
    console.log("next");
    if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){

    }
else{

  //same auper vala copy kar kay dala url vala
let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c56478f2069544e28ff421f5dd1c0ce6&page=${this.state.page + 1}&pageSize=20`;

let data = await fetch(url);
let parsedData = await data.json();
console.log(parsedData);
this.setState({
  page: this.state.page + 1,
articles: parsedData.articles,
});

}
};


  handlePreviousClick = async () => {
    console.log("previous");

    //same copy kia
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c56478f2069544e28ff421f5dd1c0ce6&page=${this.state.page - 1}&pageSize=20`;
    

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
    });
  };

  render() {
    console.log("render");
    return (
      <>
        <div className="container my-3 ">
          <h1>SmartNews - Top Headlines</h1>

          <div className="row mx-2">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  {/* ya khud hi jitnay bhi card ab dalon ga vo khud align ho jain gay  */}
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePreviousClick}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}
