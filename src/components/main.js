import axios from "axios"

const Card = (article) => {

  
  // console.log(article)

  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <article class="card hide" key={ article.id }>
  //   <h3 class="headline">{ headline }</h3>
  //   <aside class="author">
  //     <img src={ authorPhoto } alt={ authorName }>
  //     <p>By { authorName }</p>
  //   </aside>
  // </article>
  //

  let newArticle = document.createElement("article")
  const newHeadline = document.createElement("h3")
  const newAside = document.createElement("aside")
  const newAuthorImg = document.createElement("img")
  const newAuthorName = document.createElement("p")

  newArticle.className = "card hide"
  newArticle.setAttribute("key", article.id)
  
  newHeadline.className = "headline"
  newHeadline.textContent = article.headline
  newArticle.appendChild(newHeadline)

  newAside.className = "author"
  newArticle.appendChild(newAside)

  newAuthorImg.setAttribute("src", article.authorPhoto)
  newAuthorImg.setAttribute("alt", article.authorName)
  newAside.appendChild((newAuthorImg))

  newAuthorName.textContent = article.authorName
  newAside.appendChild((newAuthorName))
  
  
  return newArticle

}

const mainAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  const mainElement = document.querySelector(selector)
  
  axios.get("https://lambda-times-api.herokuapp.com/articles")
    .then(res => {

      // console.log(res.data.articles)
      const articleList = res.data.articles
      //get all article topics
      const topicList = Object.keys(res.data.articles)

      // console.log(topicList)
      //make sections for each topic list
      
      topicList.forEach(topic => {
        const newSection = document.createElement("section")
        newSection.setAttribute("id", topic)
        newSection.className = "main-section"
        const newDiv = document.createElement("div")
        const newHeader = document.createElement("h2")

        const newButton = document.createElement("button")
        newButton.classList = "topic-button"
        newButton.textContent = "+"
        newButton.setAttribute("key", topic)
        newHeader.textContent = topic
        
        newDiv.appendChild(newHeader)
        newDiv.appendChild(newButton)

        newSection.appendChild(newDiv)

        // console.log(articleList[topic])
        articleList[topic].forEach(article => {
          newSection.appendChild(Card(article))
        })

        newButton.addEventListener("click", (e) => {
          e.preventDefault()
          e.target.classList.toggle("selected")
          if(e.target.textContent == "+"){
            e.target.textContent = "-"
          }else{
            e.target.textContent = "+"
          }
          console.log("click")
          const articles = newSection.querySelectorAll("article")
          
          articles.forEach(item => {
            console.log("item ", item)
            item.classList.toggle("hide")
          })
        },100)

        mainElement.appendChild(newSection)
      })
    })
}

export { Card, mainAppender }
