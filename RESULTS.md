# UI lab results

Tool parts that I chose: Part 1 (Selenium IDE) and Part 3 (Robot Framework)

## Part 0
- Step 0.1, Chrome version: 157.0.8103.80
- Step 0.3, ChromeDriver version: ChromeDriver 157.0.8103.80 (5cb0fce6746acfc926045c45b23d811d479c49b9-refs/branch-heads/8103@{#1575})
- Step 0.4, locator of Pizza, Please!: button[name='pizza-please']
- Step 0.4, locator of Excluded tools: //label[normalize-space()='Excluded tools']/following-sibling::select
- Step 0.4, locator of Must be vegetarian: #default-checkbox
- Step 0.4, locator of Custom Pizza Name: input#pizza-name
- Step 0.5, pizza name, tool and calories of the run by hand: Lab Pizza 20261120-1714, Scissors, 600

| Step | Actual result | Pass or fail |
|------|---------------|--------------|
| 1 | Heading "Looking to break out of your pizza routine?" is shown | Pass |
| 2 | Max Calories per Slice, Excluded tools, Must be vegetarian and Custom Pizza Name appear | Pass |
| 3 | Fields show 600, Knife, vegetarian ticked, Lab Pizza 20261120-1714 | Pass |
| 4 | Name: Lab Pizza 20261120-1714, Tool: Scissors, Calories per slice: 600 | Pass |
| 5 | Page says "Please log in first." | Pass |
| 6 | Page shows "Latest pizza recommendations" after sign in with admin/admin | Pass |
| 7 | List shows Lab Pizza 20261120-1714 (tool=Scissors, ingredients_number=8) | Pass |

## Part 1: Selenium IDE
- Firefox version and Node.js version: Firefox 160.0.1 (64-bit), Node.js v24.14.0 (npm 11.9.0)
- Step 1.4, the line of the failed check and the line Tests: TODO-STEP-1.4
- Step 1.5, target chosen for Submit, and why the recorded one was fragile: xpath=//button[@type='submit']; the recorded css=.btn uses a class name that only describes appearance and can be shared by other buttons, so it clicks the first element with that class and would click the wrong button if a new one appeared above Submit.
- Step 1.6, commands changed, added or deleted after recording: I recorded QP-01 once, then replaced the recorded commands with the 29 commands of the lab table (loaded into ui-lab.side by a small helper script, add-qp01.js). Added: wait for element visible/present before each interaction, execute script to build a unique pizza name stored in pizzaName, assert text/value/selected label/checked/not text to check each step, store text plus execute script to check that calories are 600 or less. Changed: the pizza name typed during recording is now ${pizzaName}, and the open target is now the full QuickPizza address. Deleted: the extra recorded clicks, such as the click on the name field.
- Step 1.6, the pizza names of run 1 and run 2, from the lines info: echo: Lab Pizza 20261120-220636 and Lab Pizza 20261120-221232
- Step 1.6, the line Tests: of both runs: Tests: 2 passed, 2 total (run 1) and Tests: 2 passed, 2 total (run 2)
- Step 1.7, one line of QP01customerTest.java that needs rewriting, and why: line 100, assertThat(driver.findElement(By.xpath("//p[starts-with(., 'Name:')]")).getText(), is("Name: vars.get(...)...")); needs rewriting because vars.get(...) sits inside the quotation marks, so it is plain text and not the value of the variable. The check compares the page with the text of the variable name instead of the pizza name, and fails every time. It must be written as is("Name: " + vars.get("pizzaName").toString()).

## Part 3: Robot Framework
- robot --version: Robot Framework 7.5.1 (Python 3.11.6 on win32)
- Step 3.2, failure message for the wrong title: Title should have been 'Web Form' but was 'Web form'.
- Step 3.8, run 1, result, elapsed time and pizza name: PASS, 00:00:10.409, Lab Pizza 20261121-225341
- Step 3.8, run 2, result, elapsed time and pizza name: PASS, 00:00:10.803, Lab Pizza 20261121-225355

## Part B

1. The three number boxes of the advanced form share one id, floating_filled, so a locator by id finds three elements and a test cannot tell which one is Max Calories per Slice. The tests therefore find the box through its label, with xpath://label[contains(.,'Max Calories')]/../input, which names the box by the words that a user reads. This locator breaks if the label text changes or if the label and the input no longer share a parent. QuickPizza could give each box its own id, such as id="max-calories", or a data-testid attribute. A tester can then write a short locator that finds exactly one element and does not depend on the layout, so a redesign of the form does not break the tests.

2. Step 7 takes the expected tool from the answer of step 4 and compares it with the tool in the admin list, so the oracle is a consistency oracle: the expected value is not worked out on its own or taken from a specification, it comes from another output of the same system. The check would catch a fault where the server stores a different pizza than the one it showed, for example an admin list that records the tool of the previous request or a wrong tool. It would not catch a fault that appears in both places, so step 4 checks the restriction on its own, and the test shows that the tool is not Knife.

3. QP-01 ticks Must be vegetarian but checks only the name, the tool and the calories. A check would read every ingredient of the answer and assert that none of them is on a list of non-vegetarian ingredients, such as meat and fish. The test needs a source for this list. The best source is the page or the API, for example a response that marks each ingredient as vegetarian or not, and otherwise a reference list that the tester keeps in the test. The page should also show each ingredient as its own element, so that the test can read each name without cutting up one long text.

4. In Selenium IDE the waits were commands of the project, such as wait for element visible on css=h1 with 10000 milliseconds and wait for element present on the option Knife, and the test went on as soon as the element was there. In Robot Framework I set timeout=10s on SeleniumLibrary and used keywords such as Wait Until Element Is Visible and Wait Until The Page Is Ready, and no test used a fixed pause in either tool. The IDE was quicker for the first lines, but the recorded commands had to be replaced by the table of 29 commands, and saving the project file in the right place and with the right name cost me time. Robot Framework took more typing, but each keyword read like a step of QP-01 and I could run it after every addition. The runner of Selenium IDE printed only a pass line and the echo of the pizza name, for example QP-01 customer in about 5 seconds. Robot Framework gave log.html and report.html with every step, its message, its time (10.409 and 10.803 seconds for my two runs) and a screenshot, so it was much easier to read.

5. I would use Robot Framework for the automated UI tests of Project 2. The first reason is the evidence: every run writes a log and a report with each step, its elapsed time and the screenshots that the test takes, which is what Project 2 asks me to show, while the Selenium IDE runner printed only a line per test. The second reason is the resource file: the locators and the steps of each page sit in keywords such as Turn On Advanced, so the test file reads like the written test case and a changed locator is repaired in one place. A third help was that the whole test ran from the command line in headless mode, in about ten seconds, so that I could repeat it.

6. The recorder chose css=.btn for the Submit button, which is built from a class name that describes how the button looks and not what it does. The same class can belong to other buttons, and css=.btn selects the first element that has it, so a new button above Submit, or a restyled class, would make the test click the wrong element or none. The target xpath=//button[@type='submit'] relies on the type attribute, which states that this button submits the form. A redesign of the colours or the layout does not change this attribute, so the target keeps working.

7. If QuickPizza changed the locator of the calories box, I would change one line: the variable ${MAX CALORIES} in the Variables section of resources/quickpizza.resource. The keywords Turn On Advanced and Fill In The Pizza Request use this variable, and pizza_scenario.robot only calls the keyword with the values 600, Knife and ${name}. The test file therefore never holds a locator, and it stays the same when the page changes. A change of the page is repaired once in the resource file, and every test that uses the keyword works again.