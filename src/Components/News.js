// import React, { Component } from "react";
import { useState,useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
  //ais may ham nay constructor ko use kara this.state kar kay state banatay hain ya bhi daka hay aur change karnay kay liay this.setState kartay hain

//convert class state info function useState
const [articles, setArticles] = useState([]);
const [loading, setLoading] = useState(true);
const [page, setPage] = useState(1);
const [totalResults, settotalResults] = useState(0);


const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
//ya dynamically ham title change kar rahay hain apni app ka
document.title = `${capitalizeFirstLetter(
  props.category
)} - SmartNews`;

  // constructor(props) {
  //   super(props);
  //   console.log("Hello I am a constructor from News components");
    
  // }

  
  const updateNews = async ()=>{
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    
    setLoading(true)
    // this.setState({ loading: true });
    
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults)
    setLoading(false)
    
    
    // this.setState({
      //   articles: parsedData.articles,
      //   totalResults: parsedData.totalResults,
      //   loading: false,
      // });
    }


    //ya vo method hay jo kay tab run ho ga jab ap ka ya nichay pura component ka render run ho jay ga phir ya run ho ga Q kay ya react life cycle ka method hay react-life-cycle ko samajnay kay liay ais link may jao (https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
    
    // async componentDidMount() {
    //   console.log("cdm");
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     props.country
    //   }&category=${
    //     props.category
    //   }&apiKey=${props.apiKey}&page=${
    //     this.state.page + 1
    //   }&pageSize=${props.pageSize}`;
    //   this.setState({ loading: true });
  
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);
    //   this.setState({
    //     articles: parsedData.articles,
    //     totalResults: parsedData.totalResults,
    //     loading: false,
    //   });
    // }
  
    useEffect(() => {
      updateNews();
     
    }, []);

  //Making logic on Next and previous buttons

  const handleNextClick = async () => {
    console.log("next");
    if (
      !(
       page + 1 >
        Math.ceil(totalResults / props.pageSize)
      )
    ) {
      //same auper vala copy kar kay dala url vala
      let url = `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&category=${
        props.category
      }&apiKey=${props.apiKey}&page=${
        page + 1
      }&pageSize=${props.pageSize}`;
      setLoading(true)

      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
     
      // this.setState({
      //   page: this.state.page + 1,
      //   articles: parsedData.articles,
      //   loading: false,
      // });

      setPage(page +1)
      setArticles(parsedData.articles)
      setLoading(false)
    }
  };
   
  const handlePreviousClick = async () => {
    console.log("previous");

    //same copy kia
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${
      props.category
    }&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;

    //ya loading kay liay kar rahay hain
    // this.setState({ loading: true });
    setLoading(true)

    let data = await fetch(url);
    let parsedData = await data.json();
  
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    setPage(page -1)
    setArticles(parsedData.articles)
    setLoading(false)

  };


  // ya function hay jo kay use ho raha hay infinite scrolling may 
 const fetchMoreData = async () => {

  //  this.setState({page: this.state.page + 1})
   setPage(page + 1)

   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
  
  //  this.setState({ loading: true });
  setLoading(true)
 
     let data = await fetch(url);
     let parsedData = await data.json();
     console.log(parsedData);
   
   
     //  this.setState({
    //    articles: this.state.articles.concat(parsedData.articles),
    //    totalResults: parsedData.totalResults,
    //    loading: false,
    //  });

     setArticles(articles.concat(parsedData.articles))
     settotalResults( parsedData.totalResults)
     setLoading(false)
   
  };



  
    console.log("render");
    return (
      <>
        <div className="container my-3">
          <div className="text-center py-3">
            {/* ya ham jo h1 hay vaha bhi change kar rahay hain apnay h1 ko dynamically */}
            <h1>
              SmartNews - Top {capitalizeFirstLetter(props.category)}{" "}
              Headlines
            </h1>

            {/* using spinner component  aur ais syntax may likha hay ager true ho loading to dikho varna nahi */}
            {loading && <Spinner />}
          </div>

          {/* 1st ham nay nichay jo .map vala code hay vaha ham nay ak gif lagaya tha jo kay loading pay chal raha tha lakin ab ham infinite scroll bar dana chatay hain to aus kay liay ham nay ya infinite scroll package install kia hay aur vo use kar rahay hain ya code aus ki live example say lia hay aur end kia hay row div kay bad aur jo loading lagaya tha map par vo hata dia hay  */}

          <InfiniteScroll
            dataLength={articles.length} // yaha article .length kar dia 
            next={fetchMoreData}
            hasMore={articles.length !== totalResults} //has more pay ya day dia state may bhi totalResult ko default 0 kar dia ya totalResult bhi data say a raha hay api valay
            loader={<Spinner/>}
          >
            <div className="container">
            
            <div className="row mx-2">
              {/* yaha add karin gay kay ager loading nahi hay to dikho data varna nahi dikhao  */}

              {articles.map((element) => {
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
                Math.ceil(this.state.totalResults / props.pageSize)
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

  
  News.defaultPorps = {
    country: "us",
    pageSize: 6,
    category: "business",
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };



export default News
