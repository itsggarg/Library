import pytest
import time
import json
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

driver = webdriver.Chrome()

driver.get("http://localhost:5173/")
driver.set_window_size(1552, 832)

driver.find_element(By.LINK_TEXT, "Sign up").click()

username_field = WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".bg-slate-200:nth-child(1)")))
username_field.click()
username_field.send_keys("user5")

password_field = WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".bg-slate-200:nth-child(2)")))
password_field.click()
password_field.send_keys("user")

confirm_password_field = WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".flex:nth-child(3)")))
confirm_password_field.click()
confirm_password_field.send_keys("user")

driver.find_element(By.CSS_SELECTOR, ".font-bold:nth-child(4)").click()

login_username_field = WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".bg-gray-200:nth-child(1)")))
login_username_field.click()
login_username_field.send_keys("user5")

login_password_field = WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.CSS_SELECTOR, ".bg-gray-200:nth-child(2)")))
login_password_field.click()
login_password_field.send_keys("user")

driver.find_element(By.CSS_SELECTOR, ".font-bold:nth-child(3)").click()

driver.close()
