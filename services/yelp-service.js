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
        const requestBodyData = req.body;
        console.log('req.body', req.body);
        const { location, categories } = req.body;
        let response = await this.axios({
            method: "get",
            url: `${process.env.YELP_SEARCH_URL}`,
            headers: {
              Authorization: `Bearer ${process.env.YELP_API_KEY}`,
            },
            params: {
              location,
              categories
            }
          });
        console.log('response is:', response);
        res.json(response.data);
    } catch (error ) {
        res.send(error);
    }
  }
}

export default YelpService;
