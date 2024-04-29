import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException

class TestSearching():
    def setup_method(self, method):
        self.driver = webdriver.Chrome()
        self.vars = {}
    
    def teardown_method(self, method):
        self.driver.quit()
    
    def retry(self, func, retries=3):
        for _ in range(retries):
            try:
                return func()
            except StaleElementReferenceException:
                continue
        raise StaleElementReferenceException("Element is still stale after retrying.")

    def test_searching(self):
        self.driver.get("http://localhost:5173/")
        self.driver.set_window_size(1552, 832)
        
        username_field = self.driver.find_element(By.CSS_SELECTOR, ".bg-gray-200:nth-child(1)")
        username_field.click()
        username_field.send_keys("user")
        
        password_field = self.driver.find_element(By.CSS_SELECTOR, ".bg-gray-200:nth-child(2)")
        password_field.click()
        password_field.send_keys("user")
        
        login_button = self.driver.find_element(By.CSS_SELECTOR, ".font-bold:nth-child(3)")
        login_button.click()
        
        search_field = self.retry(lambda: WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".bg-gray-200"))))
        search_field.click()
        search_field.send_keys("artific")
        
        
test = TestSearching()
test.setup_method(None)
test.test_searching()
test.teardown_method(None)
