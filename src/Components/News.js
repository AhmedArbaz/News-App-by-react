import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'







export default class News extends Component {
  //ais may ham nay constructor ko use kara this.state kar kay state banatay hain ya bhi daka hay aur change karnay kay liay this.setState kartay hain

  static defaultPorps = {
    country:'us',
    pageSize: 6,
    category:'business',
  }

  static propTypes ={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,

  }
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
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c56478f2069544e28ff421f5dd1c0ce6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
this.setState({loading: true})

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles,
       totalResults:parsedData.totalResults,
      loading:false });
  }

  //Making logic on Next and previous buttons

  handleNextClick = async () => {
    console.log("next");
    if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //same auper vala copy kar kay dala url vala
let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c56478f2069544e28ff421f5dd1c0ce6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
this.setState({loading: true})

let data = await fetch(url);
let parsedData = await data.json();
console.log(parsedData);
this.setState({
  page: this.state.page + 1,
articles: parsedData.articles,
loading:false,
});

}
};


  handlePreviousClick = async () => {
    console.log("previous");

    //same copy kia
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c56478f2069544e28ff421f5dd1c0ce6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    
    //ya loading kay liay kar rahay hain 
    this.setState({loading: true})

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false,
    });
  };

  render() {
    console.log("render");
    return (
      <>
        <div className="container my-3">
          <div className="text-center py-3">

          <h1>SmartNews - Top Headlines</h1>

          {/* using spinner component  aur ais syntax may likha hay ager true ho loading to dikho varna nahi */}
          {this.state.loading && <Spinner/>} 
          
          </div>

          <div className="row mx-2">
            {/* yaha add karin gay kay ager loading nahi hay to dikho data varna nahi dikhao  */}
            {!(this.state.loading) && this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  {/* ya khud hi jitnay bhi card ab dalon ga vo khud align ho jain gay  */}
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
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
            disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
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
