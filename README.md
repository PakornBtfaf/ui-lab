# ui-lab

Lab on automated UI testing of QuickPizza (https://quickpizza.grafana.com).

I chose two tool parts: Part 1 (Selenium IDE) and Part 3 (Robot Framework). The answers, versions and run evidence are in RESULTS.md.

## selenium-ide

Holds the Selenium IDE project ui-lab.side with the tests `web form` and `QP-01 customer`, and QP01customerTest.java, the export of QP-01 customer as Java code. To run the tests, set the environment variable CHROMEDRIVER, put the folder of the ChromeDriver on the Path, and run this command in the folder selenium-ide.

    npx --yes selenium-side-runner@4.0.13 ui-lab.side

## robot

Holds the Robot Framework tests: first.robot and web_form.robot for the web form, and pizza_scenario.robot for test case QP-01, with its keywords in resources/quickpizza.resource. The folder results holds the evidence of two full runs, run1 and run2. To run QP-01, create and activate a virtual environment, install requirements.txt, and run this command in the folder robot.

    robot pizza_scenario.robot