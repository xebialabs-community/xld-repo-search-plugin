#
# Copyright 2025 XEBIALABS
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
#

from com.xebialabs.deployit.plugin.api.udm.base import BaseDeployed
from com.xebialabs.deployit.plugin.api.udm import ConfigurationItem
from com.xebialabs.deployit.plugin.api.udm import Container
from com.xebialabs.deployit.plugin.api.validation import ValidationMessage

searchType = request.query['p1']
searchParent = request.query['p2']
searchAncestor = request.query['p3']
searchForProperties = request.entity['searchForProperties'].replace(' ','').split(',')

rootList = ["Applications", "Environments", "Infrastructure", "Configuration"]
rootErrorMessage = "The path must be under Applications, Environments, Infrastructure, or Configuration."

if searchParent is not None and searchParent.split('/')[0] not in rootList:
  raise Exception("Invalid parent path: " + rootErrorMessage)

if searchAncestor is not None and searchAncestor.split('/')[0] not in rootList:
  raise Exception("Invalid ancestor path: " + rootErrorMessage)

items = repositoryService.query(Type.valueOf(searchType),searchParent,searchAncestor,None,None,None,0,-1)

# Loop through the objects found
result = []
#for item in items:
#  r = repositoryService.read(item.id)
#  result.append({'c1':item.id, 'c2':r.getProperty('JavaVirtualMachine_initialHeapSize'), 'c3':r.getProperty('JavaVirtualMachine_maximumHeapSize')})

headings = ["Configuration Item Id"]
for prop in searchForProperties:
  headings.append(prop)
result.append(headings)

for item in items:
  r = repositoryService.read(item.id)
  values = [item.id]
  for prop in searchForProperties:
    values.append(str(r.getProperty(prop)))
  result.append(values)

response.entity = result
