const NUM_STARS = 10;

function main() {
  const starsNear = document.getElementsByClassName("stars-near")[0];
  const starsMid = document.getElementsByClassName("stars-mid")[0];
  const starsFar = document.getElementsByClassName("stars-far")[0];

  if (starsNear) {
    populateStars(starsNear, 10);
    populateStars(starsMid, 10);
    populateStars(starsFar, 10);
  }
}

function populateStars(stars, count) {
  for (let i = 0; i < count; i++) {
    let star = document.createElement("div");
    star.className = "star";

    let x = Math.random() * 200 - 100;
    let y = Math.random() * 100;
    let delay = Math.random() * 10;

    star.style = `left: ${x}vw; top: ${y}vh; animation-delay: ${delay}s
    `;

    stars.appendChild(star);

    if (x < 0) {
      let copyStar = document.createElement("div");
      copyStar.className = "star";

      let copyX = x + 200;
      copyStar.style = `left: ${copyX}vw; top: ${y}vh; animation-delay: ${delay}s`;

      console.log("style", copyStar.style);

      stars.appendChild(copyStar);
    }
  }
}

main();
