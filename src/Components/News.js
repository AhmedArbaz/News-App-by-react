import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  //ais may ham nay constructor ko use kara this.state kar kay state banatay hain ya bhi daka hay aur change karnay kay liay this.setState kartay hain

  static defaultPorps = {
    country: "us",
    pageSize: 6,
    category: "business",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("Hello I am a constructor from News components");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    //ya dynamically ham title change kar rahay hain apni app ka
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - SmartNews`;
  }

  //ya vo method hay jo kay tab run ho ga jab ap ka ya nichay pura component ka render run ho jay ga phir ya run ho ga Q kay ya react life cycle ka method hay react-life-cycle ko samajnay kay liay ais link may jao (https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
  async componentDidMount() {
    console.log("cdm");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

async updateNews(){
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c56478f2069544e28ff421f5dd1c0ce6&page=${this.state.page}&pageSize=${this.props.pageSize}`
  
  this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
}

  //Making logic on Next and previous buttons

  handleNextClick = async () => {
    console.log("next");
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      //same auper vala copy kar kay dala url vala
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=${this.props.apiKey}&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });

      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
    }
  };

  handlePreviousClick = async () => {
    console.log("previous");

    //same copy kia
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;

    //ya loading kay liay kar rahay hain
    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };


  // ya function hay jo kay use ho raha hay infinite scrolling may 
 fetchMoreData = async () => {
   this.setState({page: this.state.page + 1})
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
  
   this.setState({ loading: true });
 
     let data = await fetch(url);
     let parsedData = await data.json();
     console.log(parsedData);
     this.setState({
       articles: this.state.articles.concat(parsedData.articles),
       totalResults: parsedData.totalResults,
       loading: false,
     });
   
  };



  render() {
    console.log("render");
    return (
      <>
        <div className="container my-3">
          <div className="text-center py-3">
            {/* ya ham jo h1 hay vaha bhi change kar rahay hain apnay h1 ko dynamically */}
            <h1>
              SmartNews - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
              Headlines
            </h1>

            {/* using spinner component  aur ais syntax may likha hay ager true ho loading to dikho varna nahi */}
            {this.state.loading && <Spinner />}
          </div>

          {/* 1st ham nay nichay jo .map vala code hay vaha ham nay ak gif lagaya tha jo kay loading pay chal raha tha lakin ab ham infinite scroll bar dana chatay hain to aus kay liay ham nay ya infinite scroll package install kia hay aur vo use kar rahay hain ya code aus ki live example say lia hay aur end kia hay row div kay bad aur jo loading lagaya tha map par vo hata dia hay  */}

          <InfiniteScroll
            dataLength={this.state.articles.length} // yaha article .length kar dia 
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults} //has more pay ya day dia state may bhi totalResult ko default 0 kar dia ya totalResult bhi data say a raha hay api valay
            loader={<Spinner/>}
          >
            <div className="container">
            
            <div className="row mx-2">
              {/* yaha add karin gay kay ager loading nahi hay to dikho data varna nahi dikhao  */}

              {this.state.articles.map((element) => {
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
            </div>
          </InfiniteScroll>


{/* infinite vali scrolling kay laiy ya buttons hata diay   */}
{/* 
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
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div> */}

        </div>
      </>
    );
  }
}
