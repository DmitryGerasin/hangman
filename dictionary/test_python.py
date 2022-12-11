import timeit

arr1 = []
for i in range(100000):
   arr1.append(i)
 
start = timeit.default_timer()
for i in range(len(arr1)):
   print(arr1[i])
end = timeit.default_timer()

 
start = timeit.default_timer()
for elem in arr1:
   print(elem)
end = timeit.default_timer()
print('Time for loop 1: ', end - start)
print('Time for loop 2: ', end - start)
