function api() {
   let api = "https://api.github.com/graphql";
   fetch(api, {
      method: "POST",
      headers: {
         Authorization: "bearer 639c2f9a205dec5502fdbe6627287806dd8067c5",
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         query: `{
  user(login: "ch-ivy") {
    name
    bio
    repositories(first: 5) {
      nodes {
        id
        name
        updatedAt
        stargazerCount
        forkCount
        languages(first: 2) {
          nodes {
            id
            name
            color
          }
        }
      }
    }
  }
}`,
      }),
   })
      .then((data) => {
         return data.json();
      })
      .then((data) => {
         console.log(data);
      })
      .catch(function (err) {
         // There was an error
         console.warn("Something went wrong.", err);
      });
}

function toggleMenu() {}
