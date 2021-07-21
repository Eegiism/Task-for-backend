# Task for backend developers

Your objective is to develop a node.js microservice that renders invoices to PDFs. It should expose a REST API that handles incoming JSON requests and renders the invoice similar to this:

![Preview](./docs/preview.png)

## Details

- The service should be started with `npm run start` and listen on port 3000
- We use mostly TypeScript, but you can use plain JavaScript as well
- You can choose what tools and libraries to use, there's no right or wrong here
- Do not care to much about the design or text, some fields are definitely missing...
- Once you're done provide us with a zip of you service or a link to a repository

## Testing

Send the sample request data at [`./test/fixtures/sample-request.json`](./test/fixtures/sample-request.json) to your service in a post request and check the result.

Running `npm run test` does exactly this, with _curl_:

```sh
curl -X POST -H "Content-Type: application/json" -d @./test/fixtures/sample-request.json http://localhost:3000 --output test/results/sample-request.pdf
```

> Note that the test script may not work on a non-unix (e.g. Windows) platform

## Help / Feedback

Use this form if you have any questions or ideas for improvements:

https://docs.google.com/forms/d/e/1FAIpQLSeVbbrwj4RDjE4P1hkm5O88aFWPHtq3P0ugXxLf2Yw_DxH3pQ/viewform?usp=pp_url&entry.646872245=Backend

Good luck!
