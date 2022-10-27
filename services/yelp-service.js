import BaseService from "./base-service.js";
import { Client as craiyonClient } from "craiyon";
import axios from "axios";

//TODO MAKE THIS ABOUT YELP
/**
 * This class creates the AIPictureService which is a service rendered by the API
 * to allow the client to trade text-prompts for images based off of those prompts
 * that are created by the AI.
 */
class YelpService extends BaseService {
  constructor(stash, log, axios, moment) {
    super(stash, log, axios, moment);
    this.craiyon = new craiyonClient();
  }

  /*
   * This method is called by the client-application with a prompt text. This text is, in turn,
   * used to generate AI-Created Art and the base64 of this image is sent back to the client.
   * @param {Object} req - the request body
   * @param {Object} res - the response body
   * @returns {base64} - the picture described by the prompt from the request body.
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

  async postForReview(req, res) {
    try {
      console.log(req.body);
      const { id } = req.body
      let response = await this.axios({
        method: "get",
        url: `https://api.yelp.com/v3/businesses/${id}/reviews`,
        headers: {
            Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        }
      })
      console.log('review response:',  response);

      res.json(response.data.reviews[0]);
    } catch (error) {
      res.send(error);
    }
  }
}

export default YelpService;
