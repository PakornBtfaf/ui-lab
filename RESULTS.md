# UI lab results

Tool parts that I chose: Part 1 (Selenium IDE) and Part 3 (Robot Framework)

## Part 0
- Step 0.1, Chrome version: 157.0.8103.80
- Step 0.3, ChromeDriver version: ChromeDriver 157.0.8103.80 (5cb0fce6746acfc926045c45b23d811d479c49b9-refs/branch-heads/8103@{#1575})
- Step 0.4, locator of Pizza, Please!: button[name='pizza-please']
- Step 0.4, locator of Excluded tools: //label[normalize-space()='Excluded tools']/following-sibling::select
- Step 0.4, locator of Must be vegetarian: #default-checkbox
- Step 0.4, locator of Custom Pizza Name: input#pizza-name
- Step 0.5, pizza name, tool and calories of the run by hand:Lab Pizza 20261120-1530, Scissors, 480

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
- Firefox version and Node.js version:Firefox 160.0.1 (64-bit), Node.js v24.14.0 (npm 11.9.0)
- Step 1.4, the line of the failed check and the line Tests:Actual value 'Received!' did not match 'Received' during assertText:id=message:Received ; Tests: 1 failed, 1 total
- Step 1.5, target chosen for Submit, and why the recorded one was fragile:target chosen for Submit, and why the recorded one was fragile: xpath=//button[@type='submit']; the recorded css=.btn uses a class name that only describes appearance and can be shared by other buttons, so it clicks the first element with that class and would click the wrong button if a new one appeared above Submit.
- Step 1.6, commands changed, added or deleted after recording: I recorded QP-01 once, then replaced the recorded commands with the 29 commands of the lab table (loaded into ui-lab.side by a small helper script, add-qp01.js). Added: wait for element visible/present before each interaction, execute script to build a unique pizza name stored in pizzaName, assert text/value/selected label/checked/not text to check each step, store text plus execute script to check that calories are 600 or less. Changed: the pizza name typed during recording is now ${pizzaName}, and the open target is now the full QuickPizza address. Deleted: the extra recorded clicks, such as the click on the name field.
- Step 1.6, the pizza names of run 1 and run 2, from the lines info: echo: Lab Pizza 20261120-220636 and Lab Pizza 20261120-221232
- Step 1.6, the line Tests: of both runs: Tests: 2 passed, 2 total (run 1) and Tests: 2 passed, 2 total (run 2)
- Step 1.7, one line of QP01customerTest.java that needs rewriting, and why:

## Part 3: Robot Framework
- robot --version:
- Step 3.2, failure message for the wrong title:
- Step 3.8, run 1, result, elapsed time and pizza name:
- Step 3.8, run 2, result, elapsed time and pizza name:

## Part B
1.
2.
3.
4.
5.
6.
7.