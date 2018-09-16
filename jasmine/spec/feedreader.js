/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */


$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('each feed should have a URL defined and not empty', function(){
           for(let i=0; i<allFeeds.length; i++){
               expect(allFeeds[i].url).toBeDefined();
               expect(allFeeds[i].url).not.toBe('');
             }

         });


        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('each feed should have a name defined and not empty', function(){
           for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');

         }
    });
    });



    /* a new test suite named "The menu" */
    describe("The menu", function() {
      let menuButton =   $('a.menu-icon-link');
      let body =  $('body');

        /* a test that ensures the menu element is
         * hidden by default.
         */
         it('the menu element should be hidden by default', function () {
             expect(body.hasClass('menu-hidden')).toBe(true);
       });

         /*  a test that ensures the menu changes
          * visibility when the menu icon is clicked.
          *  This test has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('the menu should display when clicked and does it hide when clicked again', function() {
      menuButton.click();
      expect(body.hasClass('menu-hidden')).toBe(false);

      menuButton.click();
      expect(body.hasClass('menu-hidden')).toBe(true);
    });
  });


    /* a new test suite of "Initial Entries" */
    describe("Initial Entries", function() {

      //Jasmine's beforeEach and asynchronous done() function
      // Because loadFeed() is asynchronous
      beforeEach(function(done) {
         loadFeed(0, done);
     });
        /*a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         it('the feed container should have at least 1 entry after loadFeed function is called', function() {
           let entryElements = $('.feed').has('.entry').length;
             expect(entryElements).toBeGreaterThan(0);
         });
     });



    /* a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      let initialFeed;

        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         //loadFeed() is asynchronous
         beforeEach(function(done) {
            loadFeed(0, function() {
                // store old feed
                initialFeed = $('.feed').html();
                // fetch newer feed
                loadFeed(1, done);
            });
        });
        it('the new feed content should change ', function() {
          let newFeed = $('.feed').html();
            expect(newFeed).not.toBe(initialFeed);
        });
    });
}());
