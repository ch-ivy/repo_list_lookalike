var repoData;
var info;
var repo_list;

window.onload = async (event) => {
   await api();
   info = repoData.data.user;
   repo_list = repoData.data.user.repositories.nodes;
   fill();
};

async function api() {
   let api = "https://api.github.com/graphql";
   await fetch(api, {
      method: "POST",
      headers: {
         Authorization: `bearer `,
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         query: `{
                     user(login: "ch-ivy") {
                     login
                     name
                     bio
                     avatarUrl
                     repositories(first: 20) {
                       nodes {
                         name
                         updatedAt
                         stargazerCount
                         forkCount
                         description
                         languages(first: 1) {
                           nodes {
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
      .then(async (data) => {
         repoData = await data;
      })
      .catch(function (err) {
         // There was an error
         console.warn("Something went wrong.", err);
      });
}

function toggleMenu() {
   var x = document.getElementById("mobile_menu");
   x.classList.toggle("hide");
}

function fill() {
   const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
   };
   var img = document.querySelectorAll("img");
   for (i = 0; i < img.length; i++) {
      img[i].src = `${info.avatarUrl}`;
   }
   var name = document.querySelector(".name");
   var u_name = document.querySelector(".u-name");
   var bio = document.querySelector(".bio > p");
   var repo = document.querySelector(".list-box > ul");
   name.innerHTML = `${info.name}`;
   u_name.innerHTML = info.login;
   bio.innerHTML = info.bio;
   var value = "";

   for (let i = repo_list.length - 1; i >= 0; i--) {
      value += `<li class="list-item">
                                    <div class="row">
                                       <div class="col-lg-9">
                                          <div class="top">
                                             <h3>${repo_list[i].name}</h3>
                                          </div>
                                          
                                          <div style ="display : ${
                                             repo_list[i].description === null
                                                ? "none"
                                                : "block"
                                          };   margin: 10px auto 5px;
                                             color: #586069;"> ${
                                                repo_list[i].description
                                             } </div>
                                          <div class="bottom">
                                             <span class="lang" style="display : ${
                                                repo_list[i].languages.nodes[0]
                                                   ?.color
                                                   ? "inline-block"
                                                   : "none"
                                             }">
                                                <span
                                                   class="color"
                                                   style="
                                                      background-color: ${
                                                         repo_list[i].languages
                                                            .nodes[0]?.color
                                                      };
                                                   "
                                                ></span>
                                                <span class="text"
                                                   >${
                                                      repo_list[i].languages
                                                         .nodes[0]?.name
                                                   }</span
                                                >
                                             </span>
                                             <span class="star" style="display : ${
                                                repo_list[i].stargazerCount > 0
                                                   ? "inline-block"
                                                   : "none"
                                             }">
                                                <i class="far fa-star"></i>
                                                ${repo_list[i].stargazerCount}
                                             </span>
                                             <span class="fork" style="display : ${
                                                repo_list[i].forkCount > 0
                                                   ? "inline-block"
                                                   : "none"
                                             }">
                                                <i
                                                   class="fas fa-code-branch"
                                                ></i>
                                                ${repo_list[i].forkCount}
                                             </span>
                                             <span class="time">
                                                Updated on <span>${new Date(
                                                   repo_list[i].updatedAt
                                                ).toLocaleDateString(
                                                   "en-EN",
                                                   options
                                                )}</span>
                                             </span>
                                          </div>
                                       </div>

                                       <div class="col-lg-3">
                                          <div class="star-btn">
                                             <button class="btn">
                                                <i class="far fa-star"></i> Star
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                 </li>`;
   }
   repo.innerHTML = value;
}
