#
# THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS
# FOR A PARTICULAR PURPOSE. THIS CODE AND INFORMATION ARE NOT SUPPORTED BY XEBIALABS.
#

from com.xebialabs.deployit.plugin.api.udm.base import BaseDeployed
from com.xebialabs.deployit.plugin.api.udm import ConfigurationItem
from com.xebialabs.deployit.plugin.api.udm import Container
from com.xebialabs.deployit.plugin.api.validation import ValidationMessage

searchType = request.query['p1']
searchParent = request.query['p2']
searchAncestor = request.query['p3']
searchForProperties = request.entity['searchForProperties'].replace(' ','').split(',')

if searchParent is not None and searchParent.split('/')[0] != "Infrastructure":
  raise Exception("Invalid parent path: The path must be under Infrastructure.")

if searchAncestor is not None and searchAncestor.split('/')[0] != "Infrastructure":
  raise Exception("Invalid ancestor path: The path must be under Infrastructure.")

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
