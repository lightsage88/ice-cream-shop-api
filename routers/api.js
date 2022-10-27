import StashKu from '@appku/stashku';
import BaseRouter from './base-router.js';
import YelpService from '../services/yelp-service.js';

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

        router.post('/api/yelp', ys.post.bind(ys));
        router.post('/api/yelp-review', ys.postForReview.bind(ys));
    }
}

export default APIRouter;
