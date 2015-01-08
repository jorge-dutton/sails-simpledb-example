//
//  UsuarioInfo.h
//  Game03-Tamagochi
//
//  Created by Jose Blanco on 7/1/15.
//  Copyright (c) 2015 Medianet. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreData/CoreData.h>


@interface UsuarioInfo : NSManagedObject

@property (nonatomic, retain) NSNumber * id_usuario;
@property (nonatomic, retain) NSString * usuario;
@property (nonatomic, retain) NSString * password;
@property (nonatomic) BOOL admin;

@end


