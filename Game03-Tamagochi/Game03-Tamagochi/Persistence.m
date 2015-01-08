//
//  Persistence.m
//  Game03-Tamagochi
//
//  Created by Jose Blanco on 7/1/15.
//  Copyright (c) 2015 Medianet. All rights reserved.
//

#import "Persistence.h"
#import "UsuarioInfo.h"

@implementation Persistence
@synthesize managedObjectContext = _managedObjectContext;
@synthesize managedObjectModel = _managedObjectModel;
@synthesize persistentStoreCoordinator = _persistentStoreCoordinator;

-(id)init
{
    self = [super init];
    if (self != nil)
    {
        //Initialize the managed object model
        NSURL *modelURL = [[NSBundle mainBundle] URLForResource:@"Game03_Tamagochi" withExtension:@"momd"];
        _managedObjectModel = [[NSManagedObjectModel alloc] initWithContentsOfURL:modelURL];
        NSURL *storeURL = [[self applicationDocumentsDirectory] URLByAppendingPathComponent:@"Game03_Tamagochi.sqlite"];
        NSError *error = nil;
        
        //Initialize the persisten store coordinator
        _persistentStoreCoordinator = [[NSPersistentStoreCoordinator alloc] initWithManagedObjectModel:[self managedObjectModel]];
        
        if (![_persistentStoreCoordinator addPersistentStoreWithType:NSSQLiteStoreType configuration:nil URL:storeURL options:nil error:&error])
        {
            NSLog(@"Unresolved error %@, %@", error, [error userInfo]);
            abort();
        }
        
        //Initialize the managed object context
        _managedObjectContext = [[NSManagedObjectContext alloc]init];
        [_managedObjectContext setPersistentStoreCoordinator:self.persistentStoreCoordinator];
    }
    return self;
}

#pragma mark - Helper Methods

-(void)savedContext
{
    NSError *error = nil;
    if ([self.managedObjectContext hasChanges] && ![self.managedObjectContext save:&error])
    {
        NSLog(@"Unresolved error %@, %@", error, [error userInfo]);
        abort();
    }
}
-(NSURL *)applicationDocumentsDirectory
{
    // The directory the application uses to store the Core Data store file. This code uses a directory named "medianet.Game03_Tamagochi" in the application's documents directory.
    return [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
}

#pragma mark - Public Methods Login
-(void)loadNewUsers
{
    UsuarioInfo *usuarioInfo = [NSEntityDescription insertNewObjectForEntityForName:@"UsuarioInfo" inManagedObjectContext:self.managedObjectContext];
    
    usuarioInfo.id_usuario = [NSNumber numberWithInt:1];
    usuarioInfo.usuario = @"medianet";
    usuarioInfo.password = @"1234";
    usuarioInfo.admin = YES;
    
    [self savedContext];
}

-(NSString*)findUsers:(NSString*)user toPassword:(NSString*)password
{
    NSFetchRequest *fecthRequest = [NSFetchRequest fetchRequestWithEntityName:@"UsuarioInfo"];
    fecthRequest.predicate = [NSPredicate predicateWithFormat:@"usuario = %@ and password = %@", user, password];
    
    NSUInteger count = [self.managedObjectContext countForFetchRequest:fecthRequest error:nil];
//    return [NSString stringWithFormat:@"%lu", count];
    
    if (count>0)
        return @"OK";
    else
        return @"KO";
}

-(NSString*)countUser
{
    NSFetchRequest *fecthRequest = [NSFetchRequest fetchRequestWithEntityName:@"UsuarioInfo"];
    NSUInteger count = [self.managedObjectContext countForFetchRequest:fecthRequest error:nil];
    return [NSString stringWithFormat:@"N.Usuarios = %lu", count];
}

-(void)deleteAllUser
{
    NSFetchRequest *fechtRequest = [NSFetchRequest fetchRequestWithEntityName:@"UsuarioInfo"];
    
    NSArray *items = [self.managedObjectContext executeFetchRequest:fechtRequest error:nil];
    
    for (NSManagedObject *managedObject in items)
    {
        [self.managedObjectContext deleteObject:managedObject];
    }
    
    [self savedContext];
}


@end
