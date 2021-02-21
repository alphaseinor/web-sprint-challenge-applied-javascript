import axios from "axios"

const Tabs = (topics) => {
  console.log(topics)
  // TASK 3
  // ---------------------
  // Implement this function which takes an array of strings ("topics") as its only argument.
  // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
  // then the function returns the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  // <section class="topics">
  //   <a class="tab" href="#javascript">javascript</div>
  //   <a class="tab" href="#bootstrap">bootstrap</div>
  //   <a class="tab" href="#technology">technology</div>
  // </section>
  //

  const newSection = document.createElement("section")
  newSection.className = "topics"

  topics.forEach(topic => {
    topic === "node.js" ? topic = "node" : null
    const newAnchor = document.createElement("a")
    newAnchor.setAttribute("href", `#${topic}`)
    newAnchor.textContent = topic
    newAnchor.className = "tab"
    newSection.appendChild(newAnchor)
  })

  return newSection
}

const tabsAppender = (selector) => {
  // TASK 4
  // ---------------------
  // Implement this function which takes a css selector as its only argument.
  // It should obtain topics from this endpoint: `https://lambda-times-api.herokuapp.com/topics`
  // Find the array of topics inside the response, and create the tabs using the Tabs component.
  // Append the tabs to the element in the DOM that matches the selector passed to the function.
  //
  const mainElement = document.querySelector(selector)

  axios.get("https://lambda-times-api.herokuapp.com/topics")
    .then(res => {
      console.log(res.data)
      const topics = res.data.topics
      mainElement.appendChild(Tabs(topics))
    })
}

export { Tabs, tabsAppender }
