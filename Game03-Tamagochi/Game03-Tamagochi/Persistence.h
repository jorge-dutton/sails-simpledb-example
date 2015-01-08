//
//  Persistence.h
//  Game03-Tamagochi
//
//  Created by Jose Blanco on 7/1/15.
//  Copyright (c) 2015 Medianet. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreData/CoreData.h>

@interface Persistence : NSObject

@property (readonly, strong, nonatomic) NSManagedObjectContext *managedObjectContext;
@property (readonly, strong, nonatomic) NSManagedObjectModel *managedObjectModel;
@property (readonly, strong, nonatomic) NSPersistentStoreCoordinator *persistentStoreCoordinator;

-(void)savedContext;
-(NSURL *)applicationDocumentsDirectory;
-(void)loadNewUsers;
-(NSString*)findUsers:(NSString*)user toPassword:(NSString*)password;
-(NSString*)countUser;
-(void)deleteAllUser;
@end
