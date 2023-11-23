import React from "react";
import IMG1 from "./images/clearlightofday.jpg";
import IMG2 from "./images/circleofsilence.jpg";
import IMG4 from "./images/bunchofoldletters.jpg";

const Cards = () => {
  const soloProjects = [
    {
      id: 1,
      title: "Clear Light of Day",
      img: IMG1,
      description:
        "An introspective narrative that explores the intricacies of family, delving into sibling dynamics amidst India's post-partition era, painting a vivid emotional landscape of unresolved histories and connections",
      authors: "Anita Desai",
      links:
        "https://www.amazon.in/Clear-Light-Day-Anita-Desai/dp/8184000154"
    },
    {
      id: 2,
      title: "A Bunch of Old Letters",
      img: IMG4,
      description:
        "In a trove of forgotten letters, intertwined stories of love, loss, and mystery unfold, bridging generations and resurrecting emotions that transcend time's barriers in a poignant tapestry of human experience..",
      authors: "J. Nehru",
      links: "https://www.amazon.in/Bunch-Old-Letters-Jawaharlal-Nehru-ebook/dp/B07DGHDHN8"
    },
    {
      id: 3,
      title: "Circle of Silence",
      img: IMG2,
      description:
        "When a disappearance rattles Ashwood, buried secrets resurface, unraveling a town's façade, testing relationships, and challenging the very foundation of trust within a community bound by concealed truths.",
      authors: "Carol M. Tanzman",
      links: "https://www.amazon.in/Circle-Silence-Harlequin-Carol-Tanzman/dp/0373210620/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr="
    },
  ];

  const cardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1.5rem',
    flexWrap: 'wrap',
    background: '#795c4d',
    height: '930px',
    border: '20px solid white',
    borderRadius: '1% 1rem'
  };

  const colStyle = {
    background: 'var(--color-bg-light)',
    padding: '1.5rem',
    borderRadius: '0.8rem',
    border: '2px solid transparent',
    transition: 'background 0.3s ease-in-out, border-color 0.3s ease-in-out',
    width: '30%',
    color: 'white',
    // Adjust as needed for media queries
    '@media screen and (max-width: 1024px)': {
      width: '48%'
    },
    '@media screen and (max-width: 600px)': {
      width: '100%'
    },
    ':hover': {
      borderColor: 'var(--color-primary-variant)',
      background: 'transparent'
    }
  };

  const imageStyle = {
    borderRadius: '1.5rem',
    overflow: 'hidden',
    height: '60%',
    marginBottom: '30px'
  };

  const contentStyle = {
    height: '30%'
  };

 
/* Button component */
  const btnStyle = {
  display: 'inline-block',
  padding: '0.75rem 1.5rem',
  background: 'white',
  color: '#795c4d',
  border: 'none',
  borderRadius: '0.5rem',
  transition: 'background 0.3s ease-in-out'
};



  return (
    <section id="portfolio">


      <div className="cards-container" style={cardStyle}>
        {soloProjects.map((pro) => (
          <article className="col-md-12 mb-4" style={colStyle} key={pro.id}>
            <div className="portfolio__item-image" style={imageStyle}>
              <img src={pro.img} alt={pro.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="portfolio__item-content" style={contentStyle}>
              <h3>{pro.title}</h3>
              <p>{pro.description}</p>
              <p>{pro.authors}</p>
            </div>
            <div className="portfolio__item-cta" style={btnStyle}>
              <a
                href={pro.links}
                target="_blank"
                className="btn"
                rel="noreferrer"
              >
               Buy Now
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Cards;