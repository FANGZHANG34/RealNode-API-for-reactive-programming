import gc
from functools import partial

def do(self,sth: str,*args,**kwargs):
    typeList = type.mro(type(self))
    typeList.reverse()
    while typeList:
        temp = typeList.pop()
        if not hasattr(temp,'prototype'): continue
        try: temp = temp.prototype.get(sth)
        except: continue
        if not hasattr(temp,'__call__'): continue
        try: return temp(self,*args,**kwargs)
        except BaseException as e: RealNode.prototype['error'](self,e)
    RealNode.prototype['error'](self,f'"{sth}" not found !')
def Real_(Real_: type,do = do):
    prototype,static = {},{}
    for key in dir(Real_):
        temp = getattr(Real_,key)
        if hasattr(temp,'method'):
            prototype[key] = temp
            delattr(temp,'method')
            delattr(Real_,key)
        elif hasattr(temp,'static') and hasattr(temp,'__call__'):
            static[key] = temp
            delattr(temp,'static')
            delattr(Real_,key)
    Real_.prototype = prototype
    Real_.static = static
    Real_.do = do
    return Real_
def static(static):
    static.static = None
    return static
def method(method):
    method.method = None
    return method

del do
getReturn = lambda fn: fn()
@getReturn
def RealNode():
    proto = (0,None,None,None,None,False)
    @Real_
    class RealNode:
        tryRealNode = False
        _sys = {}
        @static
        def search(id): return RealNode._sys.get(id)
        @static
        def check(realNode):
            for key,target in RealNode._sys:
                if realNode is target: return realNode.id is key
        @static
        def listToDict(list,**temp):
            for any in list: temp[str(any)] = any
            return temp
        @static
        def createExpression(get,*relativeRNs): return RealNode(True,*relativeRNs,get = get,set = lambda: True)
        @static
        def createHidden(**config): return RealNode(**(config.__setitem__('display',False),config)[-1])
        @static
        def protoCreate(get,*list,**_):
            temp = RealNode(get = get)
            temp.proto[1] = list
            return temp
        @static
        def createNumber(*list,getNumber = lambda self,d: sum(self.proto[1],d)):
            temp = RealNode(initValue = list)
            temp.get = partial(getNumber,temp)
            return temp
        @static
        def createString(*list,getString = lambda self,sep: str(sep).join(self.proto[1])):
            temp = RealNode(initValue = list)
            temp.get = partial(getString,temp)
            return temp
        @method
        def log(self,*message): print(f'RealNode #{self.proto[0]}: {message}')
        @method
        def error(self,e): raise e if isinstance(e,BaseException) else BaseException(e)
        @method
        def notify(self,noSelf = False):
            for id in self.relativeRNs:
                realNode = RealNode.static['search'](id)
                not isinstance(realNode,RealNode) or (noSelf and self is realNode) or realNode.realReact()
        @method
        def relate(self,*relativeRNs):
            temp = relativeRNs[-1] if relativeRNs else None
            try:
                if isinstance(temp,int):
                    try: temp = RealNode.static['search'](temp)
                    except: temp = None
                elif not isinstance(temp,RealNode): temp = None
            except:pass
            for id in relativeRNs:
                if isinstance(id,int): id in self.relativeRNs or self.relativeRNs.append(id)
                else:
                    try: not isinstance(id.id,int) or id.id in self.relativeRNs or self.relativeRNs.append(id.id)
                    except: self.do('log',id,'not RealNode')
            return temp
        @method
        def unrelate(self,*unrelativeRNs):
            unrelativeRNs = list(unrelativeRNs)
            if not unrelativeRNs: return False
            temp = self.relativeRNs.copy()
            i = len(unrelativeRNs)
            self.relativeRNs.clear()
            while i:
                i -= 1
                if not isinstance(unrelativeRNs[i],int):
                    try:unrelativeRNs[i] = unrelativeRNs[i].id
                    except:unrelativeRNs.pop()
            for id in temp: unrelativeRNs.index(id) or self.relativeRNs.append(id)
            return len(temp) != len(self.relativeRNs)
        def protoGet(self): return self.proto[1]
        def protoSet(self,value):
            if value == self.proto[1]: return False
            self.proto[1] = value
            return True
        def realSet(self,value,react = False,notify = False,noSelf = False):
            return self.proto[3](value) and (react and self.proto[4](),notify and self.do('notify',noSelf),True)[-1]
        def protoReact(self):pass
        def realReact(self,notify = True,noSelf = False):
            react = self.proto[4]
            return hasattr(react,'__call__') and (react(),notify and self.do('notify',noSelf),True)[-1]
        @property
        def id(self): return self.proto[0]
        @property
        def value(self): return self.get()
        @value.setter
        def value(self,value): self.do('realSet',value,True,True)
        @property
        def set(self): return self.realSet
        @set.setter
        def set(self,set): self.proto[3] = (lambda value: set(self,value)) if hasattr(set,'__call__') else self.protoSet
        @property
        def get(self): return self.proto[2]
        @get.setter
        def get(self,get): self.proto[2] = (lambda: get(self)) if hasattr(get,'__call__') else self.protoGet
        @property
        def react(self): return self.realReact
        @react.setter
        def react(self,react): self.proto[4] = (lambda: react(self)) if hasattr(react,'__call__') else self.protoReact
        @property
        def display(self): return self.proto[0] in RealNode._sys
        @display.setter
        def display(self,display): RealNode._sys.__setitem__(self.proto[0],self) if display else ((self.proto[0] in RealNode._sys) and RealNode._sys.__delitem__(self.proto[0]))
        @property
        def tryRealNode(self): return self.proto[5]
        @tryRealNode.setter
        def tryRealNode(self,tryRealNode):
            tryRealNode = self.proto[5] = bool(tryRealNode)
        def __int__(self): return int(self.get())
        def __call__(self,*args,**kwargs):
            match len(args):
                case 0: return self.get()
                case 1: return self.realSet(args[0],True,True)
            return self.do(*args,**kwargs)
        def __init__(self,tryRealNode: bool = None,*relativeRNs,**config):
            self.relativeRNs = []
            if tryRealNode == None: tryRealNode = RealNode.tryRealNode
            self.proto = list(proto)
            self.proto[0] = hash(self) # id
            self.proto[1] = config.get('initvalue') # value
            self.display = config.get('display',True)
            self.info = config.get('info')
            self.get = config.get('get')
            self.set = config.get('set')
            self.react = config.get('react')
            self.tryRealNode = bool(tryRealNode)
            self.do('relate',*relativeRNs)
            if 'value' in config: self.value = config['value']
        def do(self,sth: str,*args,**kwargs):pass
    return RealNode

def test(realNode):
    realNode(0)
    realNode()
del Real_
del getReturn
del method
del static
# a = RealNode(123)
# print(a)
# print(a()) # 123
# print(a('abc')) # True
# print(a()) # 'abc'
# print(a('abc')) # False
# print(a.value) # 'abc'
# print(isinstance(a,RealNode)) # True

# [test(RealNode(None)) for _ in range(int(1e6))]; gc.collect()
# [RealNode(None) for _ in range(int(1e6))]; gc.collect()
# a=RealNode(initvalue = 0,react = lambda self:self.do('log',123))
# b=a.do('relate',RealNode(initvalue = 1,react = lambda self:self.do('log',456)))
# a(1)
'''
from uncertain import RealNode,test
import gc
'''