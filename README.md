## Glow Assessment

### Thorugh process

Since we are managing state in this assessment and won/lost deal is somewhat vague (implying the code should be extendable) I have opted to use the state design pattern. I have created an interface called `State` which contains methods representing various states the application can be in. Followed by creating classes for each state.

In the class `BusinessState`, its scope has been set to `REQUEST`, so that it does not hold on to state from previous API request, but start with a fresh state for each request. The down side is this will use up more memory which the GC will have to clean up.

For states that should not be reached, I am throwing an internal server error. But we can better handle this based on our requirements.
