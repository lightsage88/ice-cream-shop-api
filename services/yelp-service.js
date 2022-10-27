import BaseService from "./base-service.js";

/**
 * This class creates the YelpService which is a service rendered by the API
 * to allow the client to retrieve data from the Yelp APi
 */
class YelpService extends BaseService {
  constructor(stash, log, axios, moment) {
    super(stash, log, axios, moment);
  }

  /*
   * This method is called by the client-application with a string. This string is, in turn,
   * used to retrieve data from the Yelp API which is then sent back to the client.
   * @param {Object} req - the request body
   * @param {Object} res - the response body
   * @returns {base64} - the data from Yelp.
   */
  async post(req, res) {
    try {
      const { location, categories } = req.body;
      let response = await this.axios({
        method: "get",
        url: `${process.env.YELP_SEARCH_URL}`,
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
        params: {
          location,
          categories,
        },
      });
      res.json(
        response.data.businesses.sort((a, b) => b.review_count - a.review_count)
      );
    } catch (error) {
      res.send(error);
    }
  }

  /**
   * This method retrieves reviews for a given business by its id within the Yelp API Schema.
   * A series of Math functions are then used to return a random review along with its associated data
   * back to the client
   * @param {Object} req 
   * @param {Object} res 
   */
  async postForReview(req, res) {
    try {
      const { id } = req.body
      let response = await this.axios({
        method: "get",
        url: `https://api.yelp.com/v3/businesses/${id}/reviews`,
        headers: {
            Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        }
      })
      res.json(response.data.reviews[Math.floor(Math.random()*response.data.reviews.length)]);
    } catch (error) {
      res.send(error);
    }
  }
}

export default YelpService;
