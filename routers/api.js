import StashKu from '@appku/stashku';
import axios from 'axios';
import BaseRouter from './base-router.js';
import YelpService from '../services/yelp-service.js';
import SampleService from '../services/sample.js';

class APIRouter extends BaseRouter {

    /**
     * @inheritdoc
     */
    constructor(app, router, log, axios) {
        super(app, router, log);
        let stash = new StashKu({
            engine: '@appku/stashku-sql',
            middleware: [log]
        });
        this.axios = axios;
        const ys = new YelpService(stash, log);
        const ss = new SampleService(stash, log);

        router.post('/api/yelp', ys.post.bind(ys));
    }
}

export default APIRouter;
