import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException

def test_addRequestBookToDatabase():
    driver = webdriver.Chrome()
    driver.get("http://localhost:5173/")
    driver.set_window_size(1552, 832)
    driver.find_element(By.CSS_SELECTOR, ".bg-gray-300").click()
    driver.find_element(By.CSS_SELECTOR, ".bg-gray-200:nth-child(1)").click()
    driver.find_element(By.CSS_SELECTOR, ".bg-gray-200:nth-child(1)").send_keys("admin")
    driver.find_element(By.CSS_SELECTOR, ".bg-gray-200:nth-child(2)").send_keys("admin")
    driver.find_element(By.CSS_SELECTOR, ".text-1\\.5xl").click()
    driver.find_element(By.CSS_SELECTOR, ".w-full:nth-child(1) > .form-checkbox").click()
    
    try:
        WebDriverWait(driver, 10).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        assert alert.text == "Book is added to Library"
        alert.accept()
    except TimeoutException:
        print("No alert present")
    
    driver.quit()

test_addRequestBookToDatabase()
